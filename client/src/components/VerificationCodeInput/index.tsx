import * as React from "react";
import { InputCode, Title, VerificationCodeContainer } from "./style";

const KEY_CODE = {
  backspace: 8,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
};

interface IProps {
  type: string | number;
  onChange?: (val: string) => void;
  onComplete?: (val: string) => void;
  onFocus?: () => void;
  fields: number;
  loading?: boolean;
  title?: string;
  fieldWidth?: number;
  id?: string;
  fieldHeight?: number;
  autoFocus?: boolean;
  className?: string;
  values?: string[];
  disabled?: boolean;
  required?: boolean;
  placeholder?: string[];
}

class VerificationCodeInput extends React.Component<IProps> {

  private iRefs: any[] = [];
  private idTS: any;

  constructor(props: IProps) {
    super(props);
  }
  // tslint:disable-next-line:member-ordering
  static defaultProps = {
    type: "number",
    fields: 6,
    autoFocus: true,
    disabled: false,
    required: false,
    placeholder: [],
  };

  // tslint:disable-next-line:member-ordering
  state = {
    values: [],
    autoFocusIndex: -1,
    errorIndexesAt: [],
  };

  componentDidMount() {
    const { fields, values } = this.props;
    let vals;
    let autoFocusIndex = 0;
    if (values && values.length) {
      vals = [];
      for (let i = 0; i < fields; i++) {
        vals.push(values[i] || "");
      }
      autoFocusIndex = values.length >= fields ? 0 : values.length - 1;
    } else {
      vals = Array(fields).fill("");
    }
    this.setState({ values: vals, autoFocusIndex });

    this.iRefs = [];
    for (let i = 0; i < fields; i++) {
      this.iRefs.push(React.createRef());
    }
    this.idTS = +new Date();
  }

  clearvalues = () => {
    const { fields } = this.props;
    this.setState({ values: Array(fields).fill("") });
    this.iRefs[0].current.focus();
  }

  triggerChange = (values: Array<string | number> = this.state.values) => {
    const { onChange, onComplete, fields } = this.props;
    const val = values.join("");
    if (typeof(onChange) === "function") {
      onChange(val);
    }
    if (onComplete && val.length >= fields) {
      onComplete(val);
    }
  }

  onChange = (e: any) => {
    const index = parseInt(e.target.dataset.id, 10);
    if (this.props.type === "number") {
      e.target.value = e.target.value.replace(/[^\d]/gi, "");
    }
    if (
      e.target.value === "" ||
      (this.props.type === "number" && !e.target.validity.valid)
    ) {
      return;
    }
    let { fields } = this.props;
    if (!fields) {
      fields = 6;
    }
    let next;
    const value = e.target.value;
    let values: Array<string | number> = this.state.values;
    values = [...values];
    if (value.length > 1) {
      let nextIndex = value.length + index - 1;
      if (nextIndex >= fields) {
        nextIndex = fields - 1;
      }
      next = this.iRefs[nextIndex];
      const split = value.split("");
      split.forEach((item: any, i: number) => {
        const cursor: number = index + i;
        if (cursor < fields) {
          values[cursor] = item;
        }
      });
      this.setState({ values });
    } else {
      next = this.iRefs[index + 1];
      values[index] = value;
      this.setState({ values });
    }

    if (next) {
      next.current.focus();
      next.current.select();
    }

    this.triggerChange(values);
  }

  onKeyDown = (e: any) => {
    const index = parseInt(e.target.dataset.id, 10);
    const prevIndex = index - 1;
    const nextIndex = index + 1;
    const prev = this.iRefs[prevIndex];
    const next = this.iRefs[nextIndex];
    switch (e.keyCode) {
      case KEY_CODE.backspace:
        e.preventDefault();
        const vals: Array<string | number> = [...this.state.values];
        if (this.state.values[index]) {
          vals[index] = "";
          this.setState({ values: vals });
          this.triggerChange(vals);
        } else if (prev) {
          vals[prevIndex] = "";
          prev.current.focus();
          this.setState({ values: vals });
          this.triggerChange(vals);
        }
        break;
      case KEY_CODE.left:
        e.preventDefault();
        if (prev) {
          prev.current.focus();
        }
        break;
      case KEY_CODE.right:
        e.preventDefault();
        if (next) {
          next.current.focus();
        }
        break;
      case KEY_CODE.up:
      case KEY_CODE.down:
        e.preventDefault();
        break;
      default:
        break;
    }
  }

  onFocus = (e: any) => {
    e.target.select(e);
    this.setState({ errorIndexesAt: [] });
    const { onFocus } = this.props;
    if (typeof(onFocus) === "function") {
      onFocus();
    }
  }

  onBlur = (e: any) => {
    const { values } = this.state;
    const errorIndexesAt: number[] = [];
    values.forEach((v, i) => {
      if (!v || v === "") {
        errorIndexesAt.push(i);
      }
    });
    this.setState({ errorIndexesAt });
  }

  render() {
    const { values, autoFocusIndex, errorIndexesAt } = this.state;
    const {
      title,
      autoFocus,
      type,
    } = this.props;

    const isIndexError = (idx: number) => {
      let isError = false;
      errorIndexesAt.forEach((v) => {
        if (v === idx) {
          isError = true;
        }
      });
      return isError;
    };

    return (
      <VerificationCodeContainer>
        {title && <Title>{title}</Title>}
        <div>
          {values.map((value, index) => (
            <InputCode
              type={type === "number" ? "tel" : "text"}
              pattern={type === "number" ? "[0-9]*" : ""}
              autoFocus={autoFocus && index === autoFocusIndex}
              key={`${this.idTS}-${index}`}
              data-id={index}
              value={value}
              id={this.props.id ? `${this.props.id}-${index}` : `${index}`}
              ref={this.iRefs[index]}
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              disabled={this.props.disabled}
              required={this.props.required}
              className={isIndexError(index) ? "error" : ""}
              placeholder={(this.props.placeholder && this.props.placeholder.length > 0)
                ? this.props.placeholder[index]
                : ""}
            />
          ))}
        </div>
      </VerificationCodeContainer>
    );

  }
}

export default VerificationCodeInput;
