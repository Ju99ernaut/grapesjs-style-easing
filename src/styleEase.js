const typeEase = "cubic-bezier";

export default (editor, opts = {}) => {
  const options = {
    ...{
      bezierEditorOpts: {
        height: 300,
        width: 160,
        preview: false,
        input: false,
        handleColor: "#936a9b",
      },
    },
    ...opts,
  };

  let lastOpts = {};

  const updateLastOpts = (opts) => {
    lastOpts = opts || { fromTarget: 1, avoidStore: 1 };
    setTimeout(() => (lastOpts = {}));
  };

  const sm = editor.StyleManager;
  const predefined = {
    ease: ".25,.1,.25,1",
    linear: "0,0,1,1",
    "ease-in": ".42,0,1,1",
    "ease-out": "0,0,.58,1",
    "ease-in-out": ".42,0,.58,1",
  };

  sm.addType(typeEase, {
    view: {
      events: {},

      templateInput() {
        return ``;
      },

      onRender() {
        const { ppfx, model } = this;
        const el = document.createElement("div");
        let value = this.model.getValue();
        if (
          ["ease", "linear", "ease-in", "ease-in-out", "ease-out"].includes(
            value
          )
        )
          value = predefined[value];
        if (value && value.match("cubic-bezier") !== null)
          value = value.split("(")[1].split(")")[0];

        const be = cubicBezier({
          default: value,
          appendTo: el,
          onUpdate(be) {
            model.setValueFromInput(be.getValueString());
            updateLastOpts();
          },
          ...options.bezierEditorOpts,
        });
        const fields = this.el.querySelector(`.${ppfx}fields`);
        el.style = `height: ${
          options.bezierEditorOpts.width * 2
        }px;width: 1px;`;
        fields.appendChild(el);

        setTimeout(() => {
          be.init(value || defValue);
          this.be = be;
          // post init stuff
          el.querySelector("section.curve-library").style = "";
        }, 1);
      },

      destroy() {
        //const { be } = this;
        //be && be.destroy();
      },
    },
  });
};
