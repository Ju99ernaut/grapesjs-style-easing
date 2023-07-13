import styleEase from "./styleEase";

export default (editor, opts = {}) => {
  const options = {
    ...{
      // default options
    },
    ...opts,
  };

  styleEase(editor, options);
};
