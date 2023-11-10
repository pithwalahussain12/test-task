import * as React from "react";
import { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useQuery, gql } from "@apollo/client";
import Loader from '../Common/Loader'


const columns = [
  { field: "id", headerName: "User Id", width: 70 },
  {
    field: "name",
    headerName: "Name",
    width: 280,
  },

  {
    field: "avatar",
    headerName: "Large Avatar",
    sortable: true,
    width: 420,
    valueGetter: (params) => params.row.avatar.large
  },
  {
    field: "avatar",
    headerName: "Large Avatar",
    sortable: true,
    width: 420,
    valueGetter: (params) => params.row.avatar.medium
  },
];

const user_query = gql`
  query {
    Page(perPage: 100) {
      users {
        id
        name
        avatar {
          large
          medium
        }
      }
    }
  }
`;
export default function Studio() {
  const { loading, error, data } = useQuery(user_query);

  if (loading) return <p className="loader-pan"><Loader /></p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="" style={{ height: 600, width: "100%", paddingLeft: "0px" }}>
      <h3 className="pb-4 text-xl text-color-gray font-bold">Users</h3>
      <DataGrid
        rows={data.Page.users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 300 },
          },
        }}
        pageSizeOptions={[5, 10]}
      // checkboxSelection
      />
    </div>
  );
}
