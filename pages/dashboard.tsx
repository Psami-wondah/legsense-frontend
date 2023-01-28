import Head from "next/head";
import Guage from "../components";
import React, { useEffect, useState } from "react";
import { Api } from "../services/Api";
import { useSocketIO } from "../hooks/socket.hook";
import Table from "../components/table";
import moment from "moment";
import BasicChart from "../components/chart";
import { useRouter } from "next/router";

export interface Analytics {
  T1: string;
  T2: string;
  T3: string;
  F1: string;
  F2: string;
  F3: string;
  M1: string;
  M2: string;
  H1: string;
  H2: string;
  variable: string;
}

export default function Home() {
  const router = useRouter();

  const name = router.query?.name;
  const foot = router.query?.footside;
  const init = {
    T1: "0",
    T2: "0",
    T3: "0",
    F1: "0",
    F2: "0",
    F3: "0",
    M1: "0",
    M2: "0",
    H1: "0",
    H2: "0",
    date_added: new Date(),
  };
  const [sensorData, setSensorData] = useState(init);

  const [sensorState, setSensorState] = useState(false);

  const headers = [
    {
      Header: "Date Time",
      accessor: "date_added",
      Cell: ({ value }: { value: string }) => (
        <span>{moment(new Date(value)).format("DD.MM.yy | HH:mm:ss")}</span>
      ),
    },
    {
      Header: "T1",
      accessor: "T1",
    },
    {
      Header: "T2",
      accessor: "T2",
    },
    {
      Header: "T3",
      accessor: "T3",
    },
    {
      Header: "F1",
      accessor: "F1",
    },
    {
      Header: "F2",
      accessor: "F2",
    },
    {
      Header: "F3",
      accessor: "F3",
    },
    {
      Header: "M1",
      accessor: "M1",
    },
    {
      Header: "M2",
      accessor: "M2",
    },
    {
      Header: "H1",
      accessor: "H1",
    },
    {
      Header: "H2",
      accessor: "H2",
    },
  ];

  const analyticsHeaders = [
    {
      Header: "Variable",
      accessor: "variable",
    },
    {
      Header: "T1",
      accessor: "T1",
    },
    {
      Header: "T2",
      accessor: "T2",
    },
    {
      Header: "T3",
      accessor: "T3",
    },
    {
      Header: "F1",
      accessor: "F1",
    },
    {
      Header: "F2",
      accessor: "F2",
    },
    {
      Header: "F3",
      accessor: "F3",
    },
    {
      Header: "M1",
      accessor: "M1",
    },
    {
      Header: "M2",
      accessor: "M2",
    },
    {
      Header: "H1",
      accessor: "H1",
    },
    {
      Header: "H2",
      accessor: "H2",
    },
  ];

  const [analyticsData, setAnalyticsData] = useState<Analytics[]>([]);

  const [sensorDataList, setSensorDataList] = useState<typeof sensorData[]>([]);

  useEffect(() => {
    if (!sensorState) {
      setAnalyticsData([
        {
          variable: "Mean/Average",
          T1: (
            sensorDataList.reduce((prev, curr) => prev + Number(curr.T1), 0) /
            sensorDataList.length
          ).toFixed(1),
          T2: (
            sensorDataList.reduce((prev, curr) => prev + Number(curr.T2), 0) /
            sensorDataList.length
          ).toFixed(1),
          T3: (
            sensorDataList.reduce((prev, curr) => prev + Number(curr.T3), 0) /
            sensorDataList.length
          ).toFixed(1),
          F1: (
            sensorDataList.reduce((prev, curr) => prev + Number(curr.F1), 0) /
            sensorDataList.length
          ).toFixed(1),
          F2: (
            sensorDataList.reduce((prev, curr) => prev + Number(curr.F2), 0) /
            sensorDataList.length
          ).toFixed(1),
          F3: (
            sensorDataList.reduce((prev, curr) => prev + Number(curr.F3), 0) /
            sensorDataList.length
          ).toFixed(1),
          M1: (
            sensorDataList.reduce((prev, curr) => prev + Number(curr.M1), 0) /
            sensorDataList.length
          ).toFixed(1),
          M2: (
            sensorDataList.reduce((prev, curr) => prev + Number(curr.M2), 0) /
            sensorDataList.length
          ).toFixed(1),
          H1: (
            sensorDataList.reduce((prev, curr) => prev + Number(curr.H1), 0) /
            sensorDataList.length
          ).toFixed(1),
          H2: (
            sensorDataList.reduce((prev, curr) => prev + Number(curr.H2), 0) /
            sensorDataList.length
          ).toFixed(1),
        },
        {
          variable: "Peak/Maximum",
          T1: String(
            Math.max(...sensorDataList.map((item) => Number(item.T1)))
          ),
          T2: String(
            Math.max(...sensorDataList.map((item) => Number(item.T2)))
          ),
          T3: String(
            Math.max(...sensorDataList.map((item) => Number(item.T3)))
          ),
          F1: String(
            Math.max(...sensorDataList.map((item) => Number(item.F1)))
          ),
          F2: String(
            Math.max(...sensorDataList.map((item) => Number(item.F2)))
          ),
          F3: String(
            Math.max(...sensorDataList.map((item) => Number(item.F3)))
          ),
          M1: String(
            Math.max(...sensorDataList.map((item) => Number(item.M1)))
          ),
          M2: String(
            Math.max(...sensorDataList.map((item) => Number(item.M2)))
          ),
          H1: String(
            Math.max(...sensorDataList.map((item) => Number(item.H1)))
          ),
          H2: String(
            Math.max(...sensorDataList.map((item) => Number(item.H2)))
          ),
        },
      ]);
    }
  }, [sensorDataList, sensorState]);
  const [loading, setLoading] = useState(false);

  const getSensorDataList = async () => {
    const response = await Api.leg.getLegData();
    setSensorDataList(response.data?.items);
  };

  const getSensorState = async () => {
    const response = await Api.leg.getSensorState();
    setSensorState(response.data?.active);
  };

  const changeSensorState = async (state: boolean) => {
    setLoading(true);
    const response = await Api.leg.changeSensorState({ active: state });
    setSensorState(response.data?.active);
    setLoading(false);
  };

  useEffect(() => {
    if (sensorDataList[0]) {
      setSensorData(sensorDataList[0]);
    }
  }, [sensorDataList]);

  useEffect(() => {
    // getSensorDataList();
    setSensorDataList([init]);
    getSensorState();
  }, []);

  const { socket } = useSocketIO(setSensorDataList);

  const guageColor = (guageValue: number) => {
    if (guageValue > 900) {
      return "#ff0000";
    } else if (guageValue > 800) {
      return "#ffc0cb";
    } else if (guageValue > 600) {
      return "#800080";
    } else if (guageValue > 400) {
      return "#0000ff";
    } else return "#008000";
  };

  return (
    <>
      <Head>
        <title>LegSense</title>
        <meta name="description" content="Legsense data" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-max m-auto">
        <h1 className=" text-2xl font-rubik font-bold">
          PLANAR PRESSURE DISTRIBUTION
        </h1>
        <p>
          FOR: <span className=" font-bold font-rubik uppercase">{name}</span>
        </p>
        <p>
          FOOT SIDE:{" "}
          <span className=" font-bold font-rubik uppercase">{foot}</span>
        </p>
      </div>
      <div className=" grid grid-cols-12">
        <div className=" col-span-12 lg:col-span-3">
          <div className=" grid grid-cols-3 gap-y-10 pt-5 gap-x-4 font-rubik ">
            <div className="w-max mx-auto flex items-center">
              <p className=" text-center  font-bold">T1</p>
              <Guage
                value={Number(sensorData.T1)}
                color={guageColor(Number(sensorData.T1))}
              />
            </div>
            <div className="w-max mx-auto flex items-center">
              <p className=" text-center font-bold">T2</p>
              <Guage
                value={Number(sensorData.T2)}
                color={guageColor(Number(sensorData.T2))}
              />
            </div>
            <div className="w-max mx-auto flex items-center">
              <p className=" text-center font-bold">T3</p>
              <Guage
                value={Number(sensorData.T3)}
                color={guageColor(Number(sensorData.T3))}
              />
            </div>
            <div className="w-max mx-auto flex items-center">
              <p className=" text-center font-bold">F1</p>
              <Guage
                value={Number(sensorData.F1)}
                color={guageColor(Number(sensorData.F1))}
              />
            </div>
            <div className="w-max mx-auto flex items-center">
              <p className=" text-center font-bold">F2</p>
              <Guage
                value={Number(sensorData.F2)}
                color={guageColor(Number(sensorData.F2))}
              />
            </div>
            <div className="w-max mx-auto flex items-center">
              <p className=" text-center font-bold">F3</p>
              <Guage
                value={Number(sensorData.F3)}
                color={guageColor(Number(sensorData.F3))}
              />
            </div>
          </div>
          <div className="">
            <div className=" grid grid-cols-3 gap-y-10 pt-14 w-[80%] mx-auto">
              <div className="w-max mx-auto flex items-center">
                <p className=" text-center font-bold">M1</p>
                <Guage
                  value={Number(sensorData.M1)}
                  color={guageColor(Number(sensorData.M1))}
                />
              </div>
              <div></div>
              <div className="w-max mx-auto flex items-center">
                <p className=" text-center font-bold">M2</p>
                <Guage
                  value={Number(sensorData.M2)}
                  color={guageColor(Number(sensorData.M2))}
                />
              </div>
              <div className="w-max mx-auto flex items-center">
                <p className=" text-center font-bold">H1</p>
                <Guage
                  value={Number(sensorData.H1)}
                  color={guageColor(Number(sensorData.H1))}
                />
              </div>
              <div></div>
              <div className="w-max mx-auto flex items-center">
                <p className=" text-center font-bold">H2</p>
                <Guage
                  value={Number(sensorData.H2)}
                  color={guageColor(Number(sensorData.H2))}
                />
              </div>
            </div>
          </div>{" "}
          <div className="mx-auto flex gap-4 flex-wrap ml-10 mt-6 justify-center">
            <div className="">
              {sensorState ? (
                <button
                  className=" rounded-[10rem] bg-[#ff0000] text-white font-semibold text-lg px-5 py-3 hover:opacity-40 transition[opacity] duration-150 ease-out"
                  onClick={() => changeSensorState(false)}
                >
                  {loading ? "loading..." : "STOP"}
                </button>
              ) : (
                <button
                  className=" rounded-[10rem] bg-[#36d428] text-white font-semibold text-lg px-5 py-3 hover:opacity-40 transition[opacity] duration-150 ease-out"
                  onClick={() => changeSensorState(true)}
                >
                  {loading ? "loading..." : "START"}
                </button>
              )}
            </div>
            <div>
              <button
                className=" rounded-[10rem] bg-[#faaf2d] text-white font-semibold text-lg px-5 py-3 hover:opacity-40 transition[opacity] duration-150 ease-out"
                onClick={() => setSensorDataList([init])}
              >
                REFRESH
              </button>
            </div>
            <div>
              <button
                className=" rounded-[10rem] bg-[#4578ee] text-white font-semibold text-lg px-5 py-3 hover:opacity-40 transition[opacity] duration-150 ease-out"
                onClick={() => router.push("/")}
              >
                DONE
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-9 w-full pt-20 px-20 font-rubik pb-20">
          <Table data={sensorDataList} headers={headers} />
          <div className="pt-10 h-[50vh]">
            <BasicChart data={sensorDataList} />
          </div>
        </div>
      </div>
      {sensorDataList.length > 0 && !sensorState ? (
        <div className=" w-max mx-auto pb-20 text-center">
          <p className="font-bold uppercase">Analysis</p>
          <p>
            Summary of sensor statistics after{" "}
            {(new Date(sensorDataList[0]?.date_added).getTime() -
              new Date(
                sensorDataList[sensorDataList.length - 1]?.date_added
              ).getTime()) /
              1000}{" "}
            seconds
          </p>
          <Table data={analyticsData} headers={analyticsHeaders} />
        </div>
      ) : null}
    </>
  );
}
