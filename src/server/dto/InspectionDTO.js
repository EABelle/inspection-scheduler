const GenericModelDTO = require('./GenericModelDTO');
const OwnerDTO = require('./OwnerDTO');
const VehicleDTO = require('./VehicleDTO');
const MeetingDetailsDTO = require('./MeetingDetailsDTO');

class InspectionDTO extends GenericModelDTO {
  constructor() {
    super();
    this.data = Object.assign(this.data, {
      date: null,
      inspectorId: null,
      candidates: null,
      inspection: null,
      owner: new OwnerDTO(),
      vehicle: new VehicleDTO(),
      meetingDetails: new MeetingDetailsDTO(),
      comments: null,
    });
  }

  hydrate(data) {
    super.hydrate(data);
  }
}

module.exports = InspectionDTO;
