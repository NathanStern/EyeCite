import React from "react";

export default function Row({ row }) {
  return (
    <tr>
      <td>{row.itemName}</td>
      <td>{row.itemDate}</td>
      <td>
        <button type="button" onClick={() => {}}>
          Remove
        </button>
      </td>
    </tr>
  );
}
