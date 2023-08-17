const Datalist = () => {
  return (
    <div className="w-96 mb-2 border-l-2 bg-white">
      <div className="mb-3 p-2">
        <input
          type="search"
          className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-sm font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          id="exampleSearch"
          placeholder="Type query"
        />
      </div>
    </div>
  )
}

export { Datalist }
