import { SocialMedia } from './social-media.interface';
import { Skill } from './skill.interface';
import { Language } from './language.interface';
import { Historical } from './historical.interface';
import { Education } from './education.interface';
import { Certificate } from './certificate.interface';

export interface Resume {
  name: string;
  telephone: string;
  location: string;
  email: string;
  possition: string;
  presentation: string;
  socialmedias: SocialMedia[];
  skills: Skill[];
  languages: Language[];
  historicals: Historical[];
  educations: Education[];
  certificates: Certificate[];
}