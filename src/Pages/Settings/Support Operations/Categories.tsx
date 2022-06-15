import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAlert } from "../../../Redux/Slices/NotificationsSlice";
import { AppDispatch, RootState } from "../../../Redux/store";
import {
  newCategory,
  deleteCategory,
  editCategory,
} from "../../Data_Fetching/TicketsnUserData";

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

  //New Account Values
  const [newCategoryValue, setValue] = useState<any>({
    name: "",
    turnaround_time: "",
  });

  //Add new Account  =======================
  const handleNewCategory = (e: React.SyntheticEvent) => {
    e.preventDefault();
    newCategory(newCategoryValue?.name, newCategoryValue?.turnaround_time);
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
    <section className="w-full h-fit md:h-[47rem] py-2 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
      {/**New Category ============================================ */}
      <div className="col-span-1 p-6 h-full flex flex-col min-h-[45rem] overflow-hidden bg-white dark:bg-slate-800 ">
        <form
          action=""
          onSubmit={(e) => handleNewCategory(e)}
          className="space-y-6 flex-[1] w-full flex flex-col items-center mt-2 dark:autofill:bg-slate-900"
        >
          <h1 className="text-base text-center dark:text-slate-400 text-slate-800 uppercase font-bold font-sans">
            Category / Subject
          </h1>
          <p className="text-sm leading-6 text-slate-800 dark:text-slate-300">
            Categories are the basic building blocks used to organize your help
            desk software. Choosing the wrong categorization strategy will have
            repercussions throughout your customer service or help desk team,
            from inefficiencies in assigning requests to the inability to
            accurately report on the types of requests you’re receiving
          </p>
          <div className="h-11 w-full min-w-[15rem] rounded-xl dark:bg-slate-900 bg-slate-100 relative">
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
              className="bg-transparent w-full h-full rounded dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-6 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-slate-800 bg-slate-200"
            />
          </div>
          <div className="h-11 w-full min-w-[15rem] rounded-xl dark:bg-slate-900 bg-slate-100 relative">
            <input
              type="number"
              name="time"
              id="time"
              autoComplete="off"
              required
              placeholder="Allowed turn-around time in hours..."
              onChange={(e) =>
                setValue({
                  ...newCategoryValue,
                  turnaround_time: e.target.value,
                })
              }
              value={newCategoryValue.turnaround_time}
              className="bg-transparent w-full h-full rounded dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-6 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-slate-800 bg-slate-200"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-700 min-w-[8rem] h-8 px-4 rounded flex justify-center items-center text-slate-100  text-xs font-base tracking-wide focus:outline-none outline-none  focus:ring dark:focus:ring-slate-600 focus:ring-slate-400 hover:bg-blue-800 duration-300 transition-bg font-semibold uppercase"
          >
            Add Category
          </button>
        </form>

        {/**Guide ======================================== */}
        <div className="flex-[1] mt-4 py-4 text-slate-800 dark:text-slate-400 text-sm border-t border-slate-300 dark:border-slate-600">
          <h3 className="text-base text-center dark:text-slate-400 text-slate-800 uppercase font-bold font-sans mb-4">
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
              How does it work ?
            </summary>
            <div className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
              <p>
                Your support team will select a category on every single request
                that comes in. Selecting a category should be fast and obvious.
                It can only be fast and obvious if you limit the number of
                categories you have. It’s simply impossible to quickly choose
                the correct option from a list that contains hundreds of
                categories. In most cases, I recommend keeping the number under
                20 if possible. In some
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
                  <legend className="px-2 bg-slate-300 dark:bg-slate-900 rounded text-slate-900 dark:text-slate-300 font-semibold uppercase text-sm">
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
                      Turn-around Time
                    </span>
                    <input
                      type="text"
                      name={`${category?.id}`}
                      id={`${category?.id}`}
                      readOnly={editable === category?.id ? false : true}
                      value={
                        editable === category?.id
                          ? updatedValues.turnaround_time
                          : category?.turnaround_time
                      }
                      onChange={(e) =>
                        setValues({
                          ...updatedValues,
                          turnaround_time: e.target.value,
                        })
                      }
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
                      className="h-8 w-20 px-4 outline-none focus:outline-none hover:opacity-80 transition-all rounded-l bg-slate-700 text-slate-100 border-r border-slate-400 font-bold tracking-wider text-xs uppercase"
                    >
                      Edit
                    </button>
                    <button
                      type="submit"
                      className="h-8 w-20 px-4 outline-none focus:outline-none hover:opacity-80 transition-all bg-slate-700 text-slate-100 font-bold tracking-wider text-xs uppercase"
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
                      className="h-8 w-20 px-4 outline-none focus:outline-none hover:opacity-80 transition-all rounded-r bg-red-700 text-slate-100 border-l border-slate-400 font-bold tracking-wider text-xs uppercase"
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
