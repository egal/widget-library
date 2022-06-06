const ESelectProps = {
  label: 'Select label',
  placeholder: 'Select an option',
  size: 'md',
  clearable: true,
  searchable: false,
  multiple: false,
  options: [{ name: 'First' }, { name: 'Second' }, { name: 'Third' }],
  isLocalOptions: true,
  nonLocalOptionsTotalCount: 0,
  modelValue: [],
  shownKey: 'name',
  error: '',
  showError: true,
  validators: [],
  grouped: false,
  searchPlaceholder: 'Search',
  searchableInput: false,
  emptyDropdownText: 'no data',
  dropdownPosition: 'bottom',
  showMoreButtonDisplay: false,
  showMoreButtonText: 'Show more...',
  closeDropdownAfterSelection: true,
  openDropdown: false,
}

export default {
  ESelectProps,
}
