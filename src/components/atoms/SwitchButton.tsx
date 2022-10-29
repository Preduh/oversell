interface Props {
  onChange: () => any
  value: boolean
}

export const SwitchButton = ({ onChange, value }: Props): JSX.Element => {
  return (
    <label
    htmlFor="default-toggle"
    className="inline-flex relative items-center cursor-pointer"
  >
    <input
      type="checkbox"
      checked={value}
      onChange={onChange}
      id="default-toggle"
      className="sr-only peer"
    />
    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-zinc-600"></div>
  </label>
  )
}
