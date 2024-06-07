'use client';
import clsx from "clsx";
import Image from "next/image";
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridCellParams, GridFooterContainer, GridFooter } from '@mui/x-data-grid';
import { useState, useEffect } from 'react'
import type { InferGetStaticPropsType, GetStaticProps } from 'next'

const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: 'ranking', headerName: 'Pos.', width: 50,type: 'number',
    sortable: true,editable: false,
    disableColumnMenu: true,
    align: 'center',
    headerClassName: 'text-black races',
    cellClassName: 'relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert-0 bg-gradient-to-r from-slate-600 to-slate-700 text-gray-600 races text-white'
  },
  {
    field: 'driver', headerName: 'Driver', width: 150,
    sortable: false,editable: false,
    disableColumnMenu: true,
    headerClassName: 'text-black races',
    cellClassName: 'text-white races',
    renderCell: (params) => (
      <div style={{backgroundImage: 'linear-gradient(to bottom right, '+ params.value.team_color + 'FF, '+ params.value.team_color + 'BB, '+ params.value.team_color + 'AA)'}}>
        <img style={{height: '25px', display:'inline-block'}} src={params.value.team_logo}></img> {params.value.name}
      </div>
    )
  },
];

let rows: any[] = [];

const divStyle = {
  display:'flex',
  flexDirection:'column'
};

function CustomFooter () {
  return (
    <GridFooterContainer sx={{paddingLeft: '15px'}}>
      *sprint race
      <GridFooter sx={{
        border: 'none', // To delete double border.

      }}>
      </GridFooter>

    </GridFooterContainer>
  );
}

function loadDataHeader(data){
  data.races.map((race) => {
    columns.push({
      field: race.tracks.name_short + race.id,
      headerName: race.sprint ? race.tracks.name_short + "*" : race.tracks.name_short,
      type: 'string',
      width: 50,
      editable: false,
      sortable: true,
      disableColumnMenu: true,
      headerClassName: 'text-black races',
      align: 'center',
      valueGetter: (value: any) => {
        return value;
      },
      renderCell: (params) => (
        <p>{params.value.value}</p>
      ),
      sortComparator: (v1, v2) => {
        let pos1 = v1.position == undefined ? 50 : v1.position;
        let pos2 = v2.position == undefined ? 50 : v2.position;
        pos1 = v1.position == 'RET' ? 49 : pos1;
        pos2 = v2.position == 'RET' ? 49 : pos2;
        return pos1 - pos2;
      },
      cellClassName: (params: GridCellParams<object>) => {
        return clsx('relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert-0', {
          'bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 text-gray-600 races': params.row[params.field].position == 1,
          'bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 text-gray-600 races': params.row[params.field].position == 2,
          'bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 text-gray-600 races': params.row[params.field].position == 3,
          'bg-gradient-to-r from-lime-100 via-lime-200 to-lime-100 text-gray-600 races': params.row[params.field].position > 3 && (race.sprint ? params.row[params.field].position <= 8 : params.row[params.field].position <= 10),
          'bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-100 text-gray-600 races': (race.sprint ? params.row[params.field].position > 8 : params.row[params.field].position > 10) || params.row[params.field].position == '' || params.row[params.field].position == 'RET',
          'bg-gradient-to-r from-neutral-50 via-neutral-100 to-neutral-50 text-gray-600 races': params.row[params.field].position == undefined,
        })
      }

    })

  });

  columns.push({
    field: 'points',
    headerName: 'Points',
    type: 'number',
    width: 60,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    headerClassName: 'text-black',
    align: 'center',
    cellClassName: 'relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert-0 bg-gradient-to-r from-teal-600 to-teal-700 text-gray-600 races text-white'

  })

}

let loaded = false;
export default function Page() {
  const [storeData, setStoreData] = useState([]);
  const [byposition, setPosition] = useState(1);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_URLxx+"/api/result/1/"+byposition;
    fetch(url, {
      method: "GET",
      cache: "no-store"
    })
      .then((response) => response.json())
      .then((json) => {
        if (!loaded) {
          loadDataHeader(json);
        }
        setStoreData(json.result);
        loaded = true;
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [byposition]);

  return (
    <main className="flex min-h-screen flex-col items-left py-10 px-10">
      <h2 className="text-4xl font-extrabold dark:text-white pb-10">Formula 1 2024 Result and Ranking</h2>
      <div className="flex flex-row">
        <div className="basis-1/12">
          <div className="flex flex-row border-slate-100 rounded">
            <div className="basis-1/4">
              By:
            </div>
            <div className="basis-3/4">
              <select className="row-start-1 col-start-1 px-2 text-left text-black rounded" onChange={(e) => {
                setPosition(parseInt(e.target.value))
              }}>
                <option value={1}>Position</option>
                <option value={0}>Points</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <Box sx={{ height: 'auto', width: '100%'}}>
        {
          loaded && <DataGrid
            rows={storeData}
            columns={columns}
            rowHeight={30}
            hideFooterPagination={true}
            slots={{
              footer: CustomFooter,
            }}
            sx={{
              color: 'white',
              fontSize: '0.8rem',
              '& .MuiDataGrid-cell': {
                padding: 0,
              },
              '& .MuiDataGrid-iconButtonContainer': {
                position: 'absolute',
                left: '0px',
                top: '0px',
              },
            }}
            disableRowSelectionOnClick

          />
        }

      </Box>

    </main>
  );
}
