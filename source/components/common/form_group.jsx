class FormGroup extends React.Component {
  constructor(props) {
    super(props)

    this.defaultProps = {
      className: ""
    }
  }

  render() {
    let classNames = {
      formGroup: `form-group ${this.props.className || ""}`,
      inputField: "",
      label: ""
    }
    let inputField
    let textMuted

    if(this.props.textMuted) textMuted = <small className="text-muted">{this.props.textMuted}</small>

    if(/row/.test(classNames.formGroup)) {
      classNames.label = `${classNames.label} col-sm-2`
      classNames.inputField = "col-sm-10"
    }

    return (
      <div className={classNames.formGroup}>
        <label className={classNames.label}>{this.props.label}</label>
        <div className={classNames.inputField}>{this.props.children}{textMuted}</div>
      </div>
    )
  }
}

export default FormGroup
