import React from "react";
import * as firebase from "firebase";

export default function Row({ row }) {
  async function deleteItem(itemName, itemDate) {
    await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("items")
      .doc(itemName + "_" + itemDate)
      .delete();

    window.location.pathname = "/content/";
  }

  return (
    <tr>
      <td>{row.itemName}</td>
      <td>{row.itemDate}</td>
      <td>
        <button
          type="button"
          onClick={() => {
            deleteItem(row.itemName, row.itemDate);
          }}
        >
          Remove
        </button>
      </td>
    </tr>
  );
}
