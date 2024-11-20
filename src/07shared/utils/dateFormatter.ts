import { format, parse } from 'date-fns'
import { ru } from 'date-fns/locale'
import { DATE_FORMATS } from 'shared/constants'

export const dateFormat = (
  date: Date | string,
  formatString: (typeof DATE_FORMATS)[keyof typeof DATE_FORMATS] = DATE_FORMATS.fullDateWithTZ
) => {
  return format(new Date(date), formatString, { locale: ru })
}

export const dateToNewDate = (date: string) => {
  return parse(dateFormat(date, DATE_FORMATS.dateDotted), 'dd.MM.yyyy', new Date())
}
