import { BusinessLineModel } from "../../models/business-line.model";
import { DoctorModel } from "../../models/doctor.model";
import { SpecialtyModel } from "../../models/specialty.model";
import { EnvironmentDoctorModel } from "../../models/environment-doctor.model";
import { PatientList } from "../programation/programation.component";


export class FormFilter{
  doctor: DoctorModel;
  bl: BusinessLineModel;
  specialty: SpecialtyModel;
  environment: any;
  register :boolean;
  confirm:boolean;
  attended: boolean;
  patient : PatientList
}