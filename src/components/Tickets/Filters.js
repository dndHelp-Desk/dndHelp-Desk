import React, { useEffect } from "react";
import {
  BsShopWindow,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { filter, updateFilteredTickets } from "./../../store/TicketsSlice";

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.Tickets.filters);
  const allTickets = useSelector((state) => state.Tickets.allTickets);

  //FilterTckets Based on Input Values ========
  useEffect(() => {
    const firstMessages =
      allTickets.length &&
      allTickets.filter((ticket) => ticket.message_position === 1);
    firstMessages.length >= 1 &&
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
  }, [
    allTickets,
    dispatch,
    filters.agent,
    filters.category,
    filters.client,
    filters.status,
    filters.endDate,
    filters.startDate,
  ]);

  //Component ==============================
  return (
    <>
      <div className="h-full bg-slate-800 w-full lg:min-w-0 flex items-center rounded-full relative">
        <BsShopWindow className="text-slate-500 text-lg absolute h-10 left-3" />
        <input
          type="search"
          autoComplete="off"
          name="client"
          id="client"
          onChange={(e) =>
            dispatch(filter({ ...filters, client: e.target.value }))
          }
          className="h-full w-full bg-transparent outline-none focus:outline-none border-slate-800 rounded-full duration-300 text-slate-400 placeholder:text-slate-500 placeholder:text-xs text-sm pl-10"
          placeholder="Quick Serch By Store Name ..."
        />
      </div>
    </>
  );
};

export default Filters;
