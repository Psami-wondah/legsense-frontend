import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Index() {
  const router = useRouter();
  const [patientData, setPatientData] = useState({
    name: "",
    footside: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPatientData({
      ...patientData,
      [name]: value,
    });
  };
  const [errors, setErrors] = useState({
    name: "",
    footside: "",
  });
  useEffect(() => {
    if (patientData.name !== "") {
      setErrors((err) => ({
        ...err,
        name: "",
      }));
    }
    if (patientData.footside !== "") {
      setErrors((err) => ({
        ...err,
        footside: "",
      }));
    }
  }, [patientData]);

  const onNext = () => {
    if (patientData.name === "") {
      return setErrors((err) => ({
        ...err,
        name: "Please Enter your name",
      }));
    }

    if (patientData.footside === "") {
      return setErrors((err) => ({
        ...err,
        footside: "Please Select Footside",
      }));
    }
    router.push({
      pathname: "/dashboard",
      query: {
        name: patientData.name,
        footside: patientData.footside,
      },
    });
  };

  return (
    <>
      <div className="w-max m-auto text-center mt-[10vh] font-rubik">
        <h1 className=" text-3xl font-rubik font-bold">
          DIGITAL PLANAR PRESSURE ESTIMATION DEVICE (DPPE)
        </h1>

        <div className="pt-10">
          <p className=" text-xl  uppercase font-bold">Patient&apos;s name:</p>
          <input
            type="text"
            name="name"
            value={patientData.name}
            className=" outline-none border-2 border-gray-700 w-[30vw] p-2 rounded-lg mt-2"
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-600">{errors.name}</p>}
        </div>
        <div className="pt-10">
          <p className="text-xl  uppercase font-bold">FOOTSIDE:</p>
          <div className=" flex justify-center gap-10">
            <div>
              <input
                type="radio"
                id="left"
                name="footside"
                value="left"
                onChange={handleChange}
              />
              <label htmlFor="left" className="pl-2">
                Left
              </label>
            </div>
            <div className="">
              <input
                type="radio"
                id="right"
                name="footside"
                value="right"
                onChange={handleChange}
              />
              <label htmlFor="right" className="pl-2">
                Right
              </label>
            </div>
          </div>
          {errors.footside && <p className="text-red-600">{errors.footside}</p>}
        </div>

        <button
          className=" border border-gray-600 px-4 py-2 rounded-md mt-8 cursor-pointer hover:opacity-40 transition[opacity] duration-150 ease-out"
          type="button"
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </>
  );
}
