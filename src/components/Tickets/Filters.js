import React, { useEffect } from "react";
import { BsShopWindow } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { filter, updateFilteredTickets } from "./../../store/TicketsSlice";

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.Tickets.filters);
  const allTickets = useSelector((state) => state.Tickets.allTickets);
  const user = useSelector((state) => state.UserInfo.member_details);

  //FilterTckets Based on Input Values ========
  useEffect(() => {
    const firstMessages =
      allTickets.length &&
      allTickets.filter((ticket) => ticket.message_position === 1);
    if (firstMessages.length >= 1 && user[0].access !== "agent") {
      dispatch(
        updateFilteredTickets(
          firstMessages
            .filter(
              (ticket) =>
                ticket.status
                  .toLowerCase()
                  .replace(/\s/g, "")
                  .includes(filters.status.toLowerCase().replace(/\s/g, "")) &&
                ticket.category
                  .toLowerCase()
                  .replace(/\s/g, "")
                  .includes(
                    filters.category.toLowerCase().replace(/\s/g, "")
                  ) &&
                ticket.agent_name
                  .toLowerCase()
                  .replace(/\s/g, "")
                  .includes(filters.agent.toLowerCase().replace(/\s/g, "")) &&
                ticket.branch_company
                  .toLowerCase()
                  .replace(/\s/g, "")
                  .includes(filters.client.toLowerCase().replace(/\s/g, "")) &&
                new Date(
                  new Date(ticket.date).setDate(
                    new Date(ticket.date).getDate() - 1
                  )
                ).toISOString() >=
                  new Date(
                    filters.startDate !== null && filters.startDate
                  ).toISOString() &&
                new Date(
                  new Date(ticket.date).setDate(
                    new Date(ticket.date).getDate() - 1
                  )
                ).toISOString() <=
                  new Date(
                    filters.endDate !== null && filters.endDate
                  ).toISOString()
            )
            .sort((a, b) => {
              return (
                Number(a.ticket_id.charAt(1)) - Number(b.ticket_id.charAt(1))
              );
            })
        )
      );
    } else if (firstMessages.length >= 1 && user[0].access === "agent") {
      dispatch(
        updateFilteredTickets(
          firstMessages
            .filter(
              (ticket) =>
                ticket.status
                  .toLowerCase()
                  .replace(/\s/g, "")
                  .includes(filters.status.toLowerCase().replace(/\s/g, "")) &&
                ticket.category
                  .toLowerCase()
                  .replace(/\s/g, "")
                  .includes(
                    filters.category.toLowerCase().replace(/\s/g, "")
                  ) &&
                ticket.agent_name
                  .toLowerCase()
                  .replace(/\s/g, "")
                  .includes(filters.agent.toLowerCase().replace(/\s/g, "")) &&
                ticket.branch_company
                  .toLowerCase()
                  .replace(/\s/g, "")
                  .includes(filters.client.toLowerCase().replace(/\s/g, "")) &&
                new Date(
                  new Date(ticket.date).setDate(
                    new Date(ticket.date).getDate() - 1
                  )
                ).toISOString() >=
                  new Date(
                    filters.startDate !== null && filters.startDate
                  ).toISOString() &&
                new Date(
                  new Date(ticket.date).setDate(
                    new Date(ticket.date).getDate() - 1
                  )
                ).toISOString() <=
                  new Date(
                    filters.endDate !== null && filters.endDate
                  ).toISOString()
            )
            .filter(
              (ticket) =>
                ticket.agent_email === user[0].email &&
                user[0].access === "agent"
            )
            .sort((a, b) => {
              return (
                Number(a.ticket_id.charAt(1)) - Number(b.ticket_id.charAt(1))
              );
            })
        )
      );
    }
  }, [
    allTickets,
    dispatch,
    filters.agent,
    filters.category,
    filters.client,
    filters.status,
    filters.endDate,
    filters.startDate,
    user
  ]);

  //Component ==============================
  return (
    <>
      <div className="h-full bg-transparent w-full lg:min-w-0 flex items-center border-b dark:border-slate-700 border-slate-300 relative">
        <BsShopWindow className="text-slate-500 text-lg absolute h-10 left-3" />
        <input
          type="search"
          autoComplete="off"
          name="client"
          id="client"
          onChange={(e) =>
            dispatch(filter({ ...filters, client: e.target.value }))
          }
          className="h-full w-full bg-transparent outline-none focus:outline-none border-0 focus:ring-0 focus:border-b duration-300 text-slate-400 placeholder:text-slate-500 placeholder:text-xs text-sm pl-10 text-center"
          placeholder="Search By Store Name ..."
        />
      </div>
    </>
  );
};

export default Filters;
