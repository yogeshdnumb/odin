import { formatDistance, subDays } from "date-fns";

const modal = document.querySelector("dialog");
const create = document.querySelector(".create img");

create.addEventListener("click", () => {
    modal.showModal();
});

formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true });
