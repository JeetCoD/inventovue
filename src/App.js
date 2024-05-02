import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TbTruckDelivery,
  TbMapPinCancel,
  TbTrash,
  TbWallet,
  TbFilter,
} from "react-icons/tb";

const intialItems = [
  
];
export default function App() {
  const [items, setItems] = useState(intialItems);
  const [walletOpen, setWalletOpen] = useState(false);

  function handleWalletOpen() {
    return setWalletOpen(() => !walletOpen);
  }

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));

    toast.warning("Item deleted");
    console.log(id);
  }

  function handleDeliverItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, status: "deliver" } : item
      )
    );

    toast.success("Item Delivered");
  }

  function handleCancelItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, status: "cancel" } : item
      )
    );

    toast.info("Item Cancled");
  }

  return (
    <div>
      <Header />
      <Form onAddItem={handleAddItem} onWalletOpen={handleWalletOpen} />
      <Table
        items={items}
        onDeleteItem={handleDeleteItem}
        onDeliverItem={handleDeliverItem}
        onCancelItem={handleCancelItem}
      />
      <Wallet isOpen={walletOpen} />

      <Toaster />
    </div>
  );
}

function Header() {
  return (
    <div>
      <div className="header">
        <h1>InvetoVue</h1>
      </div>
    </div>
  );
}

function Table({ items, onDeleteItem, onDeliverItem, onCancelItem }) {
  return (
    <div className="table-wrapper">
      <table className="fl-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <TableItems
              key={item.id}
              numbering={i}
              itemKey={item.id}
              name={item.productName}
              price={item.price}
              quantity={item.quantity}
              status={item.status}
              onDeleteItem={onDeleteItem}
              onDeliverItem={onDeliverItem}
              onCancelItem={onCancelItem}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableItems({
  numbering,
  itemKey,
  name,
  price,
  quantity,
  status,
  onDeleteItem,
  onDeliverItem,
  onCancelItem,
}) {
  const style = status === "cancel" ? { textDecoration: "line-through" } : {};
  return (
    <>
      <tr>
        <td style={style}>{numbering + 1}</td>
        <td style={style}>{itemKey}</td>
        <td style={style}>{name}</td>
        <td style={style}>{quantity}</td>
        <td style={style}>{price}</td>
        <td
          className={
            status === "transit"
              ? "transit"
              : status === "deliver"
              ? "deliver"
              : "cancel"
          }
        ></td>
        <td>
          <ActionButton
            onDeleteItem={onDeleteItem}
            onDeliverItem={onDeliverItem}
            onCancelItem={onCancelItem}
            itemKey={itemKey}
          />
        </td>
      </tr>
    </>
  );
}

function ActionButton({ onDeleteItem, onDeliverItem, itemKey, onCancelItem }) {
  return (
    <div className="actions">
      <TbTruckDelivery
        className="icons delivery"
        onClick={() => onDeliverItem(itemKey)}
      />
      <TbMapPinCancel
        className="icons cancelation"
        onClick={() => onCancelItem(itemKey)}
      />
      <TbTrash className="icons delete" onClick={() => onDeleteItem(itemKey)} />
    </div>
  );
}

function Form({ onAddItem, onWalletOpen }) {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  const [productName, SetProductName] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!price || !productName) return;
    const newItem = {
      id: Date.now() + Math.round(Math.random() * 100),
      quantity,
      price,
      productName,
      status: "transit",
    };

    onAddItem(newItem);

    setPrice("");
    setQuantity(1);
    SetProductName("");

    toast.success("Item added to the list");
    console.log(newItem);
  }
  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="select-wrapper">
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                <option value={num} key={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          <input
            className="input-price"
            type="number"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
          <input
            className="input-product"
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => SetProductName(e.target.value)}
          />
          <button>Book Order</button>
        </form>
        <WalletFilter onWalletOpen={onWalletOpen} />
      </div>
    </>
  );
}

function Wallet({ isOpen }) {
  return isOpen ? (
    <div className="modal">
      <div className="wallet">
        <h1>Wallet Balance</h1>
        <p>0</p>
      </div>
    </div>
  ) : null;
}
function Filter({ isOpen }) {
  return isOpen ? (
    <div className="modal">
      <div className="wallet">
        <h1>Filters</h1>
        <form>
          <select>
            <option value="deliver">Deliver</option>
            <option value="cancel">Cancel</option>
            <option value="transit">Transit</option>
          </select>
        </form>
      </div>
    </div>
  ) : null;
}

function WalletFilter({ onWalletOpen }) {
  return (
    <div className="tools">
      <TbWallet className="tool-btn icons" onClick={onWalletOpen} />
      <TbFilter className="tool-btn icons" />
    </div>
  );
}

function Toaster() {
  return (
    <ToastContainer
      pauseOnFocusLoss={true}
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      bodyClassName="toastify"
      draggable
      pauseOnHover
      theme="light"
    />
  );
}
