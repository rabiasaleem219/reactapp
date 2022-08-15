import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const DataTable = ({ columns, rows }) => {
  //! columns y rows se reciben por parametros en la funcion
  // * columnss es un array de objetos. Debe poser un field, headername y width para que funcione
  //* columns tambien puede tener: type, description, sortable(boolean) etc
  // ? ejemplo columns = [{ field: "id", headerName: "ID", width: 70 },...]
  const [first, setfirst] = useState([]);

  const getCategoryById = (id) => {
    const categorySelect = rows.map((row) => {
      if (row.id === id) {
        return row.name;
      }
    });
    return categorySelect;
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(newSelectionModel) => {
          setfirst(newSelectionModel);
          getCategoryById();
        }}
        selectionModel={first}
      />
      <div style={{ backgroundColor: "red", height: 100 }}></div>
    </div>
  );
};

export default DataTable;
