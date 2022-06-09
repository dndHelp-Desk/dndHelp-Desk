import { FC, useState } from "react";
import { Stepper, Button} from "@mantine/core";

type Props = {
  setValues: any;
  setUpValues: any;
};

const SignUp: FC<Props> = ({ setValues, setUpValues }) => {
  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

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
                    setValues({ ...setUpValues, company_name: e.target.value })
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
                htmlFor="sending_email"
                className="w-full text-xs font-medium text-slate-700"
              >
                <span className="uppercase text-[0.7rem] font-bold">
                  Email Account
                </span>
                <input
                  type="text"
                  name="sending_email"
                  id="sending_email"
                  placeholder="support@company.com"
                  required
                  value={setUpValues.sending_email}
                  onChange={(e) =>
                    setValues({ ...setUpValues, sending_email: e.target.value })
                  }
                  className="outline-none focus:outline-none rounded placeholder:text-xs text-sm w-full bg-slate-200 border-slate-400 focus:ring-0 focus:border-slate-400 h-10"
                />
              </label>
            </div>
          </div>
        </Stepper.Step>
        <Stepper.Step
          label="Final step"
          description="Get full access"
          allowStepSelect={active > 2}
        >
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <div className="w-full flex justify-center items-center space-x-4 mt-6">
        <Button
          className="px-10 h-10 w-36 rounded-sm bg-slate-800 text-slate-50"
          onClick={prevStep}
        >
          Back
        </Button>
        <Button
          className="px-2 h-10 w-36 rounded-sm bg-blue-700 text-slate-50"
          onClick={nextStep}
        >
          {active === 2?"Finish":"Continue"}
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
