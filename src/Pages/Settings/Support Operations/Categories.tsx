import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAlert } from "../../../Redux/Slices/NotificationsSlice";
import { AppDispatch, RootState } from "../../../Redux/store";
import {
  newCategory,
  deleteCategory,
  editCategory,
} from "../../../Adapters/Data_Fetching/TicketsnUserData";

const Categories: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.Tickets.categories
  );
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );
  const [editable, setEditable] = useState<string | any>("");
  const [updatedValues, setValues] = useState<any>({
    name: "",
    turnaround_time: "",
  });

  //New Category Values
  const [newCategoryValue, setValue] = useState<any>({
    name: "",
    turnaround_time: "",
  });

  //Turnaround time in millisecods =========
  const [values, setDue] = useState<{
    day: number | string;
    hour: number | string;
    min: number | string;
  }>({
    day: "",
    hour: "",
    min: "",
  });

  //Add new subject or category  =======================
  const handleNewCategory = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const day = Number(values?.day) >= 1 ? Number(values?.day) * 86400000 : 0;
    const hour = Number(values?.hour) >= 1 ? Number(values?.hour) * 3600000 : 0;
    const min = Number(values?.min) >= 1 ? Number(values?.min) * 60000 : 0;
    const milliseconds = day + hour + min;
    if (milliseconds >= 60000) {
      newCategory(newCategoryValue?.name, milliseconds);
      setDue({
        day: "",
        hour: "",
        min: "",
      });
    } else if (milliseconds < 60000) {
      dispatch(
        updateAlert([
          ...alerts,
          {
            message: "Please enter proper time",
            color: "bg-yellow-200",
            id: new Date().getTime(),
          },
        ])
      );
    }
    dispatch(
      updateAlert([
        ...alerts,
        {
          message: "Category Added Successfully",
          color: "bg-green-200",
          id: new Date().getTime(),
        },
      ])
    );
    setValue({
      name: "",
      turnaround_time: "",
    });
  };

  //Componet  =======================
  return (
    <section className="w-full h-fit md:h-[50rem] py-2 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
      {/**New Category ============================================ */}
      <div className="col-span-1 p-6 h-full flex flex-col min-h-[45rem] overflow-hidden bg-white dark:bg-slate-800 rounded ">
        <form
          action=""
          onSubmit={(e) => handleNewCategory(e)}
          className="space-y-6 flex-[1] w-full flex flex-col items-center mt-2 dark:autofill:bg-slate-750"
        >
          <h1 className="text-base text-center dark:text-slate-300 text-slate-800 uppercase font-bold font-sans">
            Category / Subject
          </h1>
          <p className="text-sm leading-6 text-slate-800 dark:text-slate-300">
            Categories are the basic building blocks used to organize your help
            desk software. Choosing the wrong categorization strategy will have
            repercussions throughout your customer service or help desk team,
            from inefficiencies in assigning requests to the inability to
            accurately report on the types of requests you’re receiving
          </p>
          <div className="h-11 w-full min-w-[15rem] rounded-xl dark:bg-slate-750 bg-slate-100 relative">
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              placeholder="Category name ..."
              onChange={(e) =>
                setValue({ ...newCategoryValue, name: e.target.value })
              }
              value={newCategoryValue.name}
              required
              className="bg-transparent w-full h-full rounded dark:border-slate-600 border-slate-400 outline-none focus:outline-none text-sm px-6 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-slate-800 bg-white"
            />
          </div>
          <p className="dark:text-slate-400 text-slate-700 text-sm font-sans font-medium">
            Max allowed resolution time
          </p>
          <div
            className={`h-10 w-full border border-slate-400 dark:border-slate-600 mt-4 m-auto grid grid-cols-3 rounded text-xs uppercase text-slate-800 dark:text-slate-300 font-semibold`}
          >
            {/**Days ========= */}
            <div className="col-span-1 grid grid-cols-5 overflow-hidden">
              <div className="col-span-3 overflow-hidden">
                <label htmlFor="day">
                  <input
                    type="text"
                    name="day"
                    id="day"
                    value={values?.day}
                    onChange={(e) => {
                      setDue((prev: any) => ({ ...prev, day: e.target.value }));
                    }}
                    placeholder="00"
                    autoComplete="off"
                    required
                    className="h-full w-full outline-none focus:outline-none focus:border-0 focus:ring-0 border-0 bg-inherit text-inherit text-right tracking-wider px-2"
                  />
                </label>
              </div>
              <div className="col-span-2 border-x border-slate-400 dark:border-slate-600 flex justify-center items-center text-inherit">
                <span>DAY</span>
              </div>
            </div>
            {/**Hours ========= */}
            <div className="col-span-1 grid grid-cols-5 overflow-hidden">
              <div className="col-span-3 overflow-hidden">
                <label htmlFor="hours">
                  <input
                    type="text"
                    name="hours"
                    id="hours"
                    value={values?.hour}
                    onChange={(e) => {
                      setDue((prev: any) => ({
                        ...prev,
                        hour: e.target.value,
                      }));
                    }}
                    placeholder="00"
                    autoComplete="off"
                    required
                    className="h-full w-full outline-none focus:outline-none focus:border-0 focus:ring-0 border-0 bg-inherit text-inherit text-right tracking-wider px-2"
                  />
                </label>
              </div>
              <div className="col-span-2 border-x border-slate-400 dark:border-slate-600 flex justify-center items-center text-inherit">
                <span>HRS</span>
              </div>
            </div>
            {/**Minutes ========= */}
            <div className="col-span-1 grid grid-cols-5 overflow-hidden">
              <div className="col-span-3 overflow-hidden">
                <label htmlFor="minutes">
                  <input
                    type="text"
                    name="minutes"
                    id="minutes"
                    value={values?.min}
                    onChange={(e) => {
                      setDue((prev: any) => ({ ...prev, min: e.target.value }));
                    }}
                    placeholder="00"
                    autoComplete="off"
                    required
                    className="h-full w-full outline-none focus:outline-none focus:border-0 focus:ring-0 border-0 bg-inherit text-inherit text-right tracking-wider px-2"
                  />
                </label>
              </div>
              <div className="col-span-2 border-l border-slate-400 dark:border-slate-600 flex justify-center items-center text-inherit">
                <span>MIN</span>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-slate-800 dark:bg-blue-700 min-w-[8rem] h-9 px-4 rounded-sm flex justify-center items-center text-slate-100  text-xs font-base tracking-wide focus:outline-none outline-none  hover:opacity-900 duration-300 transition-bg font-medium uppercase"
          >
            Add Category
          </button>
        </form>

        {/**Guide ======================================== */}
        <div className="flex-[1] mt-4 py-4 text-slate-800 dark:text-slate-400 text-sm border-t border-slate-300 dark:border-slate-600">
          <h3 className="text-base text-center dark:text-slate-300 text-slate-800 uppercase font-bold font-sans mb-4">
            Need Help ?
          </h3>
          <details className="open:bg-white dark:open:bg-slate-800 open:border-b open:border-slate-200 dark:open:border-slate-700 p-2">
            <summary className="text-sm leading-6 text-slate-800 dark:text-slate-300 font-semibold select-none">
              What is a Category ?
            </summary>
            <div className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
              <p>
                Categories are the basic building blocks used to organize your
                help desk software. Choosing the wrong categorization strategy
                will have repercussions throughout your customer service or help
                desk team, from inefficiencies in assigning requests to the
                inability to accurately report on the types of requests you’re
                receiving
              </p>
            </div>
          </details>
          <details
            open
            className="open:bg-white dark:open:bg-slate-800 open:border-b open:border-slate-200 dark:open:border-slate-700 p-2"
          >
            <summary className="text-sm leading-6 text-slate-800 dark:text-slate-300 font-semibold select-none">
              What is allowed max time ?
            </summary>
            <div className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
              <p>
                Allowed max resolution time will help you monitor the amount of
                time each ticket is allowed to live before getting resolved. All
                overdue ticket will be indicated by red or fou can use filters
                to check overdue tickets.
              </p>
            </div>
          </details>
        </div>
      </div>

      {/**Category List ======================================= */}
      <div className="col-span-1 h-full min-h-[45rem] overflow-hidden overflow-y-scroll px-4 space-y-4">
        {categories?.length >= 1 &&
          categories.map((category) => {
            return (
              <form
                key={category.id}
                onSubmit={(e) => {
                  e.preventDefault();
                  editCategory(
                    category?.id,
                    updatedValues?.name,
                    updatedValues?.turnaround_time
                  );
                  setEditable("");
                  dispatch(
                    updateAlert([
                      ...alerts,
                      {
                        message: "category Updated Successfully",
                        color: "bg-green-200",
                        id: new Date().getTime(),
                      },
                    ])
                  );
                }}
                className=""
              >
                <fieldset className="border dark:border-slate-700 border-slate-300 rounded p-2 px-4 flex flex-col space-y-2 dark:bg-slate-800 bg-white">
                  {" "}
                  <legend className="px-2 bg-slate-200 dark:bg-slate-750 rounded text-slate-900 dark:text-slate-300 font-semibold uppercase text-sm">
                    {category?.name}
                  </legend>
                  <label
                    htmlFor={`${category?.id}`}
                    className="text-sm text-slate-600 dark:text-slate-400"
                  >
                    <span className="text-slate-800 dark:text-slate-300 font-semibold">
                      Category Name
                    </span>
                    <input
                      type="text"
                      name={`${category?.id}`}
                      id={`${category?.id}`}
                      readOnly={editable === category?.id ? false : true}
                      value={
                        editable === category?.id
                          ? updatedValues?.name
                          : category?.name
                      }
                      onChange={(e) =>
                        setValues({ ...updatedValues, name: e.target.value })
                      }
                      className="h-10 w-full bg-transparent outline-none focus:outline-none focus:ring-0 border-0 border-b border-slate-300 dark:border-slate-700"
                    />
                  </label>
                  <label
                    htmlFor={`${category?.id}`}
                    className="text-sm text-slate-600 dark:text-slate-400"
                  >
                    <span className="text-slate-800 dark:text-slate-300 font-semibold">
                      Turn-around Time in Hours
                    </span>
                    <input
                      type="text"
                      readOnly={true}
                      name={`${category?.id}`}
                      id={`${category?.id}`}
                      value={(
                        Number(category?.turnaround_time) / 3600000
                      )?.toFixed(2)}
                      className="h-10 w-full bg-transparent outline-none focus:outline-none focus:ring-0 border-0 border-b border-slate-300 dark:border-slate-700"
                    />
                  </label>
                  <div className="flex justify-center items-center py-2">
                    <button
                      type="button"
                      onClick={() => {
                        setValues({
                          name: category?.name,
                          turnaround_time: category?.turnaround_time,
                        });
                        setEditable(category.id);
                      }}
                      className="h-8 w-20 px-4 outline-none focus:outline-none hover:opacity-80 transition-all rounded-l-sm bg-slate-700 text-slate-100 border-r border-slate-400 font-medium tracking-wider text-xs uppercase"
                    >
                      Edit
                    </button>
                    <button
                      type="submit"
                      className="h-8 w-20 px-4 outline-none focus:outline-none hover:opacity-80 transition-all bg-slate-700 text-slate-100 font-medium tracking-wider text-xs uppercase"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        deleteCategory(category?.id);
                        dispatch(
                          updateAlert([
                            ...alerts,
                            {
                              message: "Category Deleted Successfully",
                              color: "bg-green-200",
                              id: new Date().getTime(),
                            },
                          ])
                        );
                      }}
                      className="h-8 w-20 px-4 outline-none focus:outline-none hover:opacity-80 transition-all rounded-r-sm bg-red-700 text-slate-100 border-l border-slate-400 font-medium tracking-wider text-xs uppercase"
                    >
                      Delete
                    </button>
                  </div>
                </fieldset>
              </form>
            );
          })}
      </div>
    </section>
  );
};

export default Categories;
