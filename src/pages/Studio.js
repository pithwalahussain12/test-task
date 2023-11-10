import * as React from "react";
import { useEffect } from "react";
import {
  DataGrid,
  GridToolbar,
} from "@mui/x-data-grid";
import { useQuery, gql } from "@apollo/client";
import Loader from '../Common/Loader';

const columns = [
  { field: "id", headerName: "Studio Id", width: 70 },
  { field: "name", headerName: "Name", width: 280 },

  {
    field: "isAnimationStudio",
    headerName: "Animation Studio",
    sortable: true,
    width: 120,
  },
  {
    field: "siteUrl",
    headerName: "Site Url",
    sortable: true,
    width: 260,
  },
  {
    field: "isFavourite",
    headerName: "Favourite",
    sortable: true,
    width: 160,
  },
  {
    field: "favourites",
    headerName: "Following",
    sortable: true,
    width: 260,
  },
];

const user_query = gql`
query{
    Page(perPage:100){
        studios{
            id
            name
            isAnimationStudio
            media {
              edges {
                id
              }
            }
            siteUrl
            isFavourite
            favourites
          }
      }
    }`;
export default function Studio() {
  const { loading, error, data } = useQuery(user_query);


  if (loading) return <p className="loader-pan"><Loader /></p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ height: 600, width: "100%" }}>
      <h3 className="pb-4 text-xl text-color-gray font-bold">Studios</h3>
      <DataGrid
        rows={data.Page.studios}
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
