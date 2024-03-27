// ability.js
import { AbilityBuilder } from '@casl/ability';

export const defineAbilitiesForStudent = () => {
  const builder = new AbilityBuilder(); // Instantiate AbilityBuilder directly
  builder.can('create', 'Todo');
  builder.can('read', 'Todo');
  return builder.build();
};

export const defineAbilitiesForTeacher = () => {
  const builder = new AbilityBuilder(); // Instantiate AbilityBuilder directly
  builder.can('manage', 'Todo');
  return builder.build();
};
