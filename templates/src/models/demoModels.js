export default class configPartnerModel {

  key;
  id;
  meaningCode;
  indicatorName;
  configState;

  constructor(modelData) {
    this.id = this.key = modelData.id;
    this.meaningCode = modelData.meaningCode;
    this.indicatorName = modelData.indicatrixName;
    this.configState = modelData.configState;
  }
}
