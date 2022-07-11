import { FC } from "react";
import { BiRocket } from "react-icons/bi";
import { Stepper, Button } from "@mantine/core";
import { Link } from "react-router-dom";

type Props = {
  setValues: any;
  setUpValues: any;
  handleSubmit: any;
  loading: boolean;
  logged: boolean;
  active: number;
  setActive: any;
};

const SignUp: FC<Props> = ({
  setValues,
  setUpValues,
  handleSubmit,
  loading,
  logged,
  active,
  setActive,
}) => {
  const nextStep = () =>
    setActive((current: number) => (current < 2 ? current + 1 : current));
  const prevStep = () =>
    setActive((current: number) => (current > 0 ? current - 1 : current));

  return (
    <div className="h-[20rem] w-[85%] mt-10 px-6">
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step
          label="Personal Info"
          description="Create an account"
          allowStepSelect={active > 0}
        >
          <div className="w-full flex flex-col justify-center items-center p-4 py-14 px-10 space-y-4">
            {/**Name & Department ========================= */}
            <div className="flex w-full justify-between items-center space-x-4">
              <label
                htmlFor="user_name"
                className="w-2/4 text-xs font-medium text-slate-700"
              >
                <span className="uppercase text-[0.7rem] font-bold">
                  Full-Name
                </span>
                <input
                  type="text"
                  name="user_name"
                  id="user_name"
                  placeholder="Your name"
                  required
                  value={setUpValues.user_name}
                  onChange={(e) =>
                    setValues({ ...setUpValues, user_name: e.target.value })
                  }
                  className="outline-none focus:outline-none rounded placeholder:text-xs text-sm w-full bg-slate-200 border-slate-400 focus:ring-0 focus:border-slate-400 h-10"
                />
              </label>
              <label
                htmlFor="department"
                className="w-2/4 text-xs font-medium text-slate-700"
              >
                <span className="uppercase text-[0.7rem] font-bold">
                  Department
                </span>
                <input
                  type="text"
                  name="department"
                  id="department"
                  required
                  placeholder="Co-Founder ..."
                  value={setUpValues.department}
                  onChange={(e) =>
                    setValues({ ...setUpValues, department: e.target.value })
                  }
                  className="outline-none focus:outline-none rounded placeholder:text-xs text-sm w-full bg-slate-200 border-slate-400 focus:ring-0 focus:border-slate-400 h-10"
                />
              </label>
            </div>

            {/**Email and Password ========================= */}
            <div className="flex w-full justify-between items-center space-x-4">
              <label
                htmlFor="user_email"
                className="w-2/4 text-xs font-medium text-slate-700"
              >
                <span className="uppercase text-[0.7rem] font-bold">
                  Email Address
                </span>
                <input
                  type="email"
                  name="user_email"
                  id="user_email"
                  placeholder="youremail@email.com"
                  required
                  value={setUpValues.user_email}
                  onChange={(e) =>
                    setValues({ ...setUpValues, user_email: e.target.value })
                  }
                  className="outline-none focus:outline-none rounded placeholder:text-xs text-sm w-full bg-slate-200 border-slate-400 focus:ring-0 focus:border-slate-400 h-10"
                />
              </label>
              <label
                htmlFor="user_password"
                className="w-2/4 text-xs font-medium text-slate-700"
              >
                <span className="uppercase text-[0.7rem] font-bold">
                  Password
                </span>
                <input
                  type="password"
                  name="user_password"
                  id="user_password"
                  required
                  pattern=".{8,}"
                  title="Enter at least 8 characters"
                  placeholder="⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎"
                  value={setUpValues.user_password}
                  onChange={(e) =>
                    setValues({ ...setUpValues, user_password: e.target.value })
                  }
                  className="outline-none focus:outline-none rounded placeholder:text-xs text-sm w-full bg-slate-200 border-slate-400 focus:ring-0 focus:border-slate-400 h-10"
                />
              </label>
            </div>
          </div>
        </Stepper.Step>

        {/** ========================Step Two ========================== */}
        <Stepper.Step
          label="Company Dtails"
          description="Name and email"
          allowStepSelect={active > 1}
        >
          <div className="w-full flex flex-col justify-center items-center p-4 py-12 px-10 space-y-6">
            {/**Company Name & Company Address ========================= */}
            <div className="flex w-full justify-between items-center space-x-4">
              <label
                htmlFor="company_name"
                className="w-2/4 text-xs font-medium text-slate-700"
              >
                <span className="uppercase text-[0.7rem] font-bold">
                  Company name
                </span>
                <input
                  type="text"
                  name="company_name"
                  id="company_name"
                  placeholder="dndHelp-Desk"
                  pattern="[A-Za-z0-9\s]*"
                  title="It must contain letters only and space if needed."
                  required
                  value={setUpValues.company_name}
                  onChange={(e) =>
                    setValues({
                      ...setUpValues,
                      company_name: e.target.value,
                      company_url: e.target.value
                        ?.replace(/[^a-zA-Z0-9]/g, "")
                        ?.replace(/\s/g, "")
                        ?.toLowerCase(),
                    })
                  }
                  className="outline-none focus:outline-none rounded placeholder:text-xs text-sm w-full bg-slate-200 border-slate-400 focus:ring-0 focus:border-slate-400 h-10"
                />
              </label>
              <label
                htmlFor="companany_address"
                className="w-2/4 text-xs font-medium text-slate-700"
              >
                <span className="uppercase text-[0.7rem] font-bold">
                  Company Address
                </span>
                <input
                  type="text"
                  name="companany_address"
                  id="companany_address"
                  required
                  placeholder="14 Lily Road, JP North"
                  value={setUpValues.companany_address}
                  onChange={(e) =>
                    setValues({
                      ...setUpValues,
                      companany_address: e.target.value,
                    })
                  }
                  className="outline-none focus:outline-none rounded placeholder:text-xs text-sm w-full bg-slate-200 border-slate-400 focus:ring-0 focus:border-slate-400 h-10"
                />
              </label>
            </div>

            {/**Company Outgoing Email & Server host ========================= */}
            <div className="flex w-full justify-between items-center space-x-4">
              <label
                htmlFor="company_url"
                className="w-full text-xs font-medium text-slate-700"
              >
                <span className="uppercase text-[0.7rem] font-bold">
                  Sub Domain
                </span>
                <div className="rounded bg-slate-200 border-slate-400 border flex justify-between flex-nowrap overflow-hidden">
                  <input
                    type="text"
                    name="company_url"
                    id="company_url"
                    placeholder="support"
                    pattern="/[^a-zA-Z0-9]/g"
                    required
                    value={
                      setUpValues.company_url?.length <= 0
                        ? setUpValues?.company_name
                            ?.replace(/[^a-zA-Z0-9]/g, "")
                            ?.replace(/\s/g, "")
                            ?.toLowerCase()
                        : setUpValues.company_url
                    }
                    onChange={(e) =>
                      setValues({
                        ...setUpValues,
                        company_url: e.target.value
                          ?.replace(/[^a-zA-Z0-9]/g, "")
                          ?.replace(/\s/g, "")
                          ?.toLowerCase(),
                      })
                    }
                    className="outline-none focus:outline-none placeholder:text-xs text-sm border-0 focus:ring-0 focus:border-slate-400 h-10 bg-inherit w-3/5"
                  />
                  <div className="h-10 w-2/5 border-l border-slate-400 flex items-center px-4">
                    <span>.dndhelp-desk.co.za</span>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </Stepper.Step>
        <Stepper.Completed>
          <div className="w-full flex flex-col justify-center items-center p-4 py-12 px-10 space-y-6">
            {loading ? (
              <>
                <h3 className="text-center font-semibold text-slate-800">
                  Please wait we still Processing ...
                </h3>
                <div className="h-2 w-40 rounded bg-slate-600 overflow-hidden relative">
                  <div
                    id="setUpLoading"
                    className="w-2/5 h-full bg-blue-700 absolute"
                  ></div>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-center font-semibold text-slate-800">
                  Account created succesfully, Press login to get started.
                </h3>
                <BiRocket className="text-3xl fill-slate-800" />
              </>
            )}
          </div>
        </Stepper.Completed>
      </Stepper>

      <div className="w-full flex justify-center items-center space-x-4 mt-6">
        <Button
          className="px-10 h-10 w-36 rounded-sm bg-slate-800 text-slate-50 font-sans font-medium text-sm"
          onClick={prevStep}
        >
          Back
        </Button>
        {logged && active === 2 ? (
          <Link to="/login">
            <Button
              disabled={active === 2 && loading ? true : false}
              className="px-2 h-10 w-36 rounded-sm bg-blue-700 text-slate-50 disabled:cursor-not-allowed disabled:opacity-75"
            >
              Login
            </Button>
          </Link>
        ) : (
          <Button
            disabled={active === 2 && loading ? true : false}
            className="px-2 h-10 w-36 rounded-sm bg-blue-700 text-slate-50 disabled:cursor-not-allowed disabled:opacity-75 font-sans font-medium text-sm"
            onClick={() => {
              active === 1 &&
                handleSubmit(setUpValues.user_email, setUpValues.user_password);
              nextStep();
            }}
          >
            {active === 1 ? "Submit" : active === 2 ? "Login" : "Continue"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SignUp;
