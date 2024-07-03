'use client';
import clsx from "clsx";
import Image from "next/image";
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridCellParams, GridFooterContainer, GridFooter } from '@mui/x-data-grid';
import { useState, useEffect } from 'react'
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { FacebookShare } from 'react-share-kit';

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
        <img alt={'Teams logo'} style={{height: '25px', display:'inline-block'}} src={params.value.team_logo}/> {params.value.name}
      </div>
    )
  },
];

const column_stats: GridColDef<(typeof rows)[number]>[] = [
  {
    field: 'ranking', headerName: 'Pos.', width: 50,type: 'number',
    sortable: true,editable: false,
    disableColumnMenu: true,
    align: 'center',
    headerClassName: 'text-black races',
    cellClassName: 'relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert-0 bg-gradient-to-r from-slate-600 to-slate-700 text-gray-600 races text-white'
  },
  {
    field: 'drivers', headerName: 'Driver', width: 150,
    sortable: false,editable: false,
    disableColumnMenu: true,
    headerClassName: 'text-black races',
    cellClassName: 'text-white races',
    renderCell: (params) => (
      <div style={{backgroundImage: 'linear-gradient(to bottom right, '+ params.value.teams.color + 'FF, '+ params.value.teams.color + 'BB, '+ params.value.teams.color + 'AA)'}}>
        <img alt={'Teams logo'} style={{height: '25px', display:'inline-block'}} src={params.value.teams.team_logo}/> {params.value.name}
      </div>
    )
  },
  {
    field: 'best_start', headerName: 'Best Start', width: 85,
    sortable: true,editable: false,type: 'number',
    disableColumnMenu: true,align: 'center',
    headerClassName: 'text-black races',
    cellClassName: 'bg-gradient-to-r from-neutral-50 via-neutral-100 to-neutral-50 text-gray-600 races',
  },
  {
    field: 'best_finish', headerName: 'Best Finish', width: 85,
    sortable: true,editable: false,type: 'number',
    disableColumnMenu: true,align: 'center',
    headerClassName: 'text-black races',
    cellClassName: 'bg-gradient-to-r from-neutral-50 via-neutral-100 to-neutral-50 text-gray-600 races',
  },
  {
    field: 'avg_start', headerName: 'Avg Start', width: 75,
    sortable: true,editable: false,type: 'number',
    disableColumnMenu: true,align: 'center',
    headerClassName: 'text-black races',
    cellClassName: 'bg-gradient-to-r from-neutral-50 via-neutral-100 to-neutral-50 text-gray-600 races',
  },
  {
    field: 'avg_end', headerName: 'Avg Finish', width: 75,
    sortable: true,editable: false,type: 'number',
    disableColumnMenu: true,align: 'center',
    headerClassName: 'text-black races',
    cellClassName: 'bg-gradient-to-r from-neutral-50 via-neutral-100 to-neutral-50 text-gray-600 races',
  },
  {
    field: 'net_position', headerName: 'Pos. Gain/Lost', width: 100,
    sortable: true,editable: false,type: 'number',
    disableColumnMenu: true,align: 'center',
    headerClassName: 'text-black races',
    cellClassName: 'bg-gradient-to-r from-neutral-50 via-neutral-100 to-neutral-50 text-gray-600 races',
  },
  {
    field: 'total_win', headerName: 'Total Win', width: 75,
    sortable: true,editable: false,type: 'number',
    disableColumnMenu: true,align: 'center',
    headerClassName: 'text-black races',
    cellClassName: 'bg-gradient-to-r from-neutral-50 via-neutral-100 to-neutral-50 text-gray-600 races',
  },
  {
    field: 'total_podium', headerName: 'Total Podium', width: 90,
    sortable: true,editable: false,type: 'number',
    disableColumnMenu: true,align: 'center',
    headerClassName: 'text-black races',
    cellClassName: 'bg-gradient-to-r from-neutral-50 via-neutral-100 to-neutral-50 text-gray-600 races',
  },
  {
    field: 'total_races', headerName: 'Total Races', width: 90,
    sortable: true,editable: false,type: 'number',
    disableColumnMenu: true,align: 'center',
    headerClassName: 'text-black races',
    cellClassName: 'bg-gradient-to-r from-neutral-50 via-neutral-100 to-neutral-50 text-gray-600 races',
  },
  {
    field: 'total_laps', headerName: 'Total Laps', width: 75,
    sortable: true,editable: false,type: 'number',
    disableColumnMenu: true,align: 'center',
    headerClassName: 'text-black races',
    cellClassName: 'bg-gradient-to-r from-neutral-50 via-neutral-100 to-neutral-50 text-gray-600 races',
  },
  {
    field: 'total_points',
    headerName: 'Points',
    type: 'number',
    width: 60,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    headerClassName: 'text-black',
    align: 'center',
    cellClassName: 'relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert-0 bg-gradient-to-r from-teal-600 to-teal-700 text-gray-600 races text-white'

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

function CustomFooterStats () {
  return (
    <GridFooterContainer sx={{paddingLeft: '15px'}}>
      include sprint race results
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

let shareUrl = 'https://www.f1-central.net';
let titleToShare = 'F1 2024 Result and Ranking';
let loaded = false;
let teamDriverData:any = [];
export default function Page() {
  const [storeData, setStoreData] = useState([]);
  const [storeDataCompare, setStoreDataCompare] = useState([]);
  const [storeDataStats, setStoreDataStats] = useState([]);
  const [byposition, setPosition] = useState(1);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_URL+"/api/result/1/"+byposition;
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
        setStoreDataCompare(json.team_driver_compare);
        console.log(json.team_driver_compare);
        loaded = true;
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [byposition]);



  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_URL+"/api/stats/1";
    fetch(url, {
      method: "GET",
      cache: "no-store"
    })
      .then((response) => response.json())
      .then((json) => {
        setStoreDataStats(json.stats);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);


  return (
    <main className="flex min-h-screen flex-col items-left py-10 px-10">
      <div className="flex flex-row">
        <div className="basis-3/4">
          <h2 className="text-4xl font-extrabold dark:text-white pb-10" >Formula 1 2024 Result and Ranking</h2>
        </div>
        <div className="basis-1/4">
          <FacebookShare url={shareUrl} quote={titleToShare} />

        </div>
      </div>
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

      <Box sx={{ height: 'auto', width: 'auto'}}>
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
              width: 'auto !important',
              color: 'white',
              fontSize: '0.8rem',
              '& .MuiDataGrid-cell': {
                padding: 0,
              },
              '& .MuiDataGrid-iconButtonContainer': {
                position: 'absolute',
                top: '0px',
              },
            }}
            disableRowSelectionOnClick

          />
        }

      </Box>
      <br/>
      <Box sx={{ height: 'auto', width: '100%'}}>
        {
          loaded && <DataGrid
            rows={storeDataStats}
            columns={column_stats}
            rowHeight={30}
            hideFooterPagination={true}
            slots={{
              footer: CustomFooterStats,
            }}
            sx={{
              color: 'white',
              fontSize: '0.8rem',
              '& .MuiDataGrid-cell': {
                padding: 0,
              }
            }}
            disableRowSelectionOnClick

          />
        }

      </Box>

      <br/>
      <div className="flex flex-row" style={{flexWrap: 'wrap'}}>
        <div className="basis-1/2">
          <div className="flex flex-row">
            <div className="basis-2/6 stat-header" style={{borderTopLeftRadius: '5px'}}>
              <p>Driver</p>
            </div>
            <div className="basis-1/6 stat-header" style={{textAlign: 'center', borderLeft:'solid 1px silver'}}>
              Start
            </div>
            <div className="basis-1/6 stat-header"></div>
            <div className="basis-1/6 stat-header" style={{textAlign: 'center', borderLeft:'solid 1px silver'}}>
              Finish
            </div>
            <div className="basis-1/6 stat-header"></div>
          </div>
        </div>
        <div className="basis-1/2">
          <div className="flex flex-row">
            <div className="basis-2/6 stat-header">
              Driver
            </div>
            <div className="basis-1/6 stat-header" style={{textAlign: 'center', borderLeft:'solid 1px silver'}}>
              Start
            </div>
            <div className="basis-1/6 stat-header"></div>
            <div className="basis-1/6 stat-header" style={{textAlign: 'center', borderLeft:'solid 1px silver'}}>
              Finish
            </div>
            <div className="basis-1/6 stat-header"style={{borderTopRightRadius: '5px'}}></div>
          </div>
        </div>
      {

        //return console.log(storeDataCompare);
        storeDataCompare.map((data:[], index) => {
          return(
            <div className="basis-1/2">
            {data['driver'].map((driver_data:[], index2) => {
                return (
                  <div className="flex flex-row" sx={{ display: 'inline' }}>
                    <div className="basis-2/6" style={{padding: '5px',display: 'inline', backgroundImage: 'linear-gradient(to bottom right, '+ data['team_detail'][0].team_color + 'FF, '+ data['team_detail'][0].team_color + 'BB, '+ data['team_detail'][0].team_color + 'AA)'}}>
                      <img alt={'Teams logo'} style={{height: '25px', display:'inline-block'}} src={data['team_detail'][0].team_logo}/>
                      {driver_data.name}
                    </div>
                    <div className="basis-1/6" style={{padding: '5px', textAlign: 'center', display: 'inline', backgroundImage: 'linear-gradient(to bottom right, '+ data['team_detail'][0].team_color + 'FF, '+ data['team_detail'][0].team_color + 'EE, '+ data['team_detail'][0].team_color + 'CC)'}}>
                      {driver_data.start}
                    </div>
                    <div className="basis-1/6" style={{padding: '5px',textAlign: 'center', display: 'inline', backgroundImage: 'linear-gradient(to bottom right, '+ data['team_detail'][0].team_color + 'FF, '+ data['team_detail'][0].team_color + 'EE, '+ data['team_detail'][0].team_color + 'CC)'}}>
                      {driver_data.start_percent} %
                    </div>
                    <div className="basis-1/6" style={{padding: '5px',textAlign: 'center', display: 'inline', backgroundImage: 'linear-gradient(to bottom right, '+ data['team_detail'][0].team_color + 'FF, '+ data['team_detail'][0].team_color + 'EE, '+ data['team_detail'][0].team_color + 'CC)'}}>
                      {driver_data.end}
                    </div>
                    <div className="basis-1/6" style={{padding: '5px',textAlign: 'center', display: 'inline', backgroundImage: 'linear-gradient(to bottom right, '+ data['team_detail'][0].team_color + 'FF, '+ data['team_detail'][0].team_color + 'EE, '+ data['team_detail'][0].team_color + 'CC)'}}>
                      {driver_data.end_percent} %
                    </div>
                  </div>
            )
            })}
            </div>
          )
        })
      }
      </div>
      <br />
      <br />
      <br />

    </main>
  );
}
