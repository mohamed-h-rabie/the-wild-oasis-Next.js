"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Button from "./Button";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const activeFilter = searchParams.get("capacity") ?? "all";
  function handleClick(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <Button
        handleClick={handleClick}
        filter="all"
        activeFilter={activeFilter}
      >
        All Cabins
      </Button>
      <Button
        handleClick={handleClick}
        filter="small"
        activeFilter={activeFilter}
      >
        1-3 Guests
      </Button>
      <Button
        handleClick={handleClick}
        filter="medium"
        activeFilter={activeFilter}
      >
        4-7 Guests
      </Button>
      <Button
        handleClick={handleClick}
        filter="large"
        activeFilter={activeFilter}
      >
        8-12 Guests
      </Button>
    </div>
  );
}

export default Filter;
