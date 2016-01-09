class FormGroup extends React.Component {
  render() {
    let classNames = {
      formGroup: `form-group ${this.props.className || ""}`,
      label: ""
    }
    let inputField
    let textMuted

    if(this.props.textMuted) textMuted = <small className="text-muted">{this.props.textMuted}</small>

    if(/row/.test(classNames.formGroup)) {
      classNames.label = `${classNames.label} col-sm-2`
      inputField = <div className="col-sm-10">{this.props.children}{textMuted}</div>
    } else {
      inputField = this.props.children + textMuted
    }

    return (
      <div className={classNames.formGroup}>
        <label className={classNames.label}>{this.props.label}</label>
        {inputField}
      </div>
    )
  }
}

export default FormGroup
