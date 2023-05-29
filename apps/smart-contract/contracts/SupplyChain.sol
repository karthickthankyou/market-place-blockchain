// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

contract SupplyChain {
    address payable public owner;
    uint256 public feePercent = 1;
    uint256 public productCounter;
    uint256 public inventoryCounter;

    struct User {
        string name;
        string contactInfo;
    }

    struct Product {
        string name;
        string description;
        string[] images;
    }

    struct Inventory {
        uint256 id;
        address payable owner;
        uint256 productId;
        uint256 price;
        uint256 quantity;
        uint256 minOrder;
        bool listed;
    }

    mapping(address => User) public users;
    mapping(uint256 => Product) public products;
    mapping(uint256 => Inventory) public inventories;
    mapping(address => uint256[]) public userInventories;

    event UserRegistered(
        address indexed owner,
        string name,
        string contactInfo
    );
    event ProductRegistered(
        uint256 id,
        uint256 inventoryId,
        string name,
        string description,
        string[] images,
        address indexed owner,
        uint256 price,
        uint256 quantity,
        uint256 minOrder,
        bool listed
    );
    event InventoryCreated(
        uint256 id,
        address indexed owner,
        uint256 productId,
        uint256 price,
        uint256 quantity,
        uint256 minOrder
    );
    event UpdateInventory(uint256 indexed inventoryId, uint256 quantity);
    event ProductPurchased(
        address indexed seller,
        address indexed buyer,
        uint256 sellerInventoryId,
        uint256 buyerInventoryId,
        uint256 quantity,
        uint256 unitPrice,
        uint256 totalPrice,
        uint256 timestamp
    );

    constructor() {
        owner = payable(msg.sender);
    }

    function registerUser(string memory _name, string memory _contactInfo)
        public
    {
        User memory user = User(_name, _contactInfo);
        users[msg.sender] = user;

        emit UserRegistered(msg.sender, _name, _contactInfo);
    }

    function registerProduct(
        string memory _name,
        string memory _description,
        string[] memory _images,
        uint256 _price,
        uint256 _quantity,
        uint256 _minOrder,
        bool _listed
    ) public {
        productCounter++;

        Product memory product = Product(_name, _description, _images);
        products[productCounter] = product;

        inventoryCounter++;

        Inventory memory inventory = Inventory(
            inventoryCounter,
            payable(msg.sender),
            productCounter,
            _price,
            _quantity,
            _minOrder,
            _listed
        );
        inventories[inventoryCounter] = inventory;
        userInventories[msg.sender].push(inventoryCounter);

        emit ProductRegistered(
            productCounter,
            inventoryCounter,
            _name,
            _description,
            _images,
            msg.sender,
            _price,
            _quantity,
            _minOrder,
            _listed
        );
    }

    function updateInventory(
        uint256 _inventoryId,
        uint256 _newQuantity,
        uint256 _newPrice,
        uint256 _newMinOrder
    ) public {
        Inventory storage inventory = inventories[_inventoryId];
        require(
            msg.sender == inventory.owner,
            "You are not the owner of this inventory"
        );

        inventory.quantity = _newQuantity;
        inventory.price = _newPrice;
        inventory.minOrder = _newMinOrder;

        emit UpdateInventory(_inventoryId, _newQuantity);
    }

    function purchaseProduct(uint256 _inventoryId, uint256 _quantity)
        public
        payable
    {
        Inventory storage inventory = inventories[_inventoryId];
        require(inventory.listed, "Product is not listed for sale");
        require(inventory.quantity >= _quantity, "Product out of stock");
        require(
            _quantity >= inventory.minOrder,
            "Order quantity is less than minimum order quantity"
        );
        require(
            msg.value >= inventory.price * _quantity,
            "Insufficient funds to purchase"
        );

        inventory.quantity -= _quantity;
        inventory.owner.transfer(
            (inventory.price * _quantity * (100 - feePercent)) / 100
        );
        owner.transfer((inventory.price * _quantity * feePercent) / 100);

        uint256 buyerInventoryId = userInventories[msg.sender].length > 0
            ? userInventories[msg.sender][
                userInventories[msg.sender].length - 1
            ]
            : 0;
        Inventory storage buyerInventory;

        if (
            buyerInventoryId == 0 ||
            inventories[buyerInventoryId].productId != inventory.productId
        ) {
            inventoryCounter++;

            Inventory memory newInventory = Inventory(
                inventoryCounter,
                payable(msg.sender),
                inventory.productId,
                inventory.price,
                _quantity,
                1,
                true
            );
            inventories[inventoryCounter] = newInventory;
            userInventories[msg.sender].push(inventoryCounter);

            emit InventoryCreated(
                inventoryCounter,
                msg.sender,
                inventory.productId,
                inventory.price,
                _quantity,
                1
            );
            buyerInventory = inventories[inventoryCounter];
        } else {
            buyerInventory = inventories[buyerInventoryId];
            buyerInventory.quantity += _quantity;
            emit UpdateInventory(buyerInventoryId, buyerInventory.quantity);
        }

        emit UpdateInventory(_inventoryId, inventory.quantity);
        emit ProductPurchased(
            inventory.owner,
            msg.sender,
            _inventoryId,
            buyerInventory.id,
            _quantity,
            inventory.price,
            inventory.price * _quantity,
            block.timestamp
        );
    }
}
