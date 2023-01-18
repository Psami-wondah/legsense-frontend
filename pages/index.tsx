import Head from "next/head";
import { Inter } from "@next/font/google";
import Guage from "../components";
import { useEffect, useState } from "react";
import { Api } from "../services/Api";
import { useSocketIO } from "../hooks/socket.hook";
import Table from "../components/table";
import moment from "moment";
import BasicChart from "../components/chart";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [sensorData, setSensorData] = useState({
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
    date_added: Date,
  });

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

  const [sensorDataList, setSensorDataList] = useState([]);
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
    getSensorDataList();
    getSensorState();
  }, []);

  const { socket } = useSocketIO(setSensorDataList);

  return (
    <>
      <Head>
        <title>LegSense</title>
        <meta name="description" content="Created by Psami" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" grid grid-cols-12">
        <div className=" col-span-12 lg:col-span-4">
          <div className=" grid grid-cols-3 gap-y-10 pt-24 font-rubik ">
            <div className="w-max mx-auto">
              <p className=" text-center">T1</p>
              <Guage value={Number(sensorData.T1)} color={"#880808"} />
            </div>
            <div className="w-max mx-auto">
              <p className=" text-center">T2</p>
              <Guage value={Number(sensorData.T2)} color={"#00008B"} />
            </div>
            <div className="w-max mx-auto">
              <p className=" text-center">T3</p>
              <Guage value={Number(sensorData.T3)} color={"red"} />
            </div>
            <div className="w-max mx-auto">
              <p className=" text-center">F1</p>
              <Guage value={Number(sensorData.F1)} color={"#A020F0"} />
            </div>
            <div className="w-max mx-auto">
              <p className=" text-center">F2</p>
              <Guage value={Number(sensorData.F2)} color={"#17e5fb"} />
            </div>
            <div className="w-max mx-auto">
              <p className=" text-center">F3</p>
              <Guage value={Number(sensorData.F3)} color={"green"} />
            </div>
          </div>
          <div className="">
            <div className=" grid grid-cols-3 gap-y-10 pt-14 w-[80%] mx-auto">
              <div className="w-max mx-auto">
                <p className=" text-center">M1</p>
                <Guage value={Number(sensorData.M1)} color={"#fb934e"} />
              </div>
              <div className="mx-auto mt-[50%] w-max">
                {sensorState ? (
                  <button
                    className=" rounded-[10rem] bg-[red] text-white font-semibold text-lg px-5 py-3"
                    onClick={() => changeSensorState(false)}
                  >
                    {loading ? "loading..." : "STOP"}
                  </button>
                ) : (
                  <button
                    className=" rounded-[10rem] bg-[#36d428] text-white font-semibold text-lg px-5 py-3"
                    onClick={() => changeSensorState(true)}
                  >
                    {loading ? "loading..." : "START"}
                  </button>
                )}
              </div>
              <div className="w-max mx-auto">
                <p className=" text-center">M2</p>
                <Guage value={Number(sensorData.M2)} color={"#4f5354"} />
              </div>
              <div className="w-max mx-auto">
                <p className=" text-center">H1</p>
                <Guage value={Number(sensorData.H1)} color={"#1748fb"} />
              </div>
              <div></div>
              <div className="w-max mx-auto">
                <p className=" text-center">H2</p>
                <Guage value={Number(sensorData.H2)} color={"#91fbf8"} />
              </div>
            </div>
          </div>{" "}
        </div>
        <div className="col-span-12 lg:col-span-8 w-full pt-20 px-20 font-rubik pb-20">
          <Table data={sensorDataList} headers={headers} />
          <div className="pt-10 h-[50vh]">
            <BasicChart data={sensorDataList} />
          </div>
        </div>
      </div>
    </>
  );
}
