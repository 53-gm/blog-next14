import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";

const ConvertDate = ({ dateISO } : Readonly<{dateISO: string}>) => {
  return (
    <time dateTime={dateISO}>
      {format(parseISO(dateISO), 'yyyy年MM月dd日', {
        locale: ja,
      })}
    </time>
  )
};

export default ConvertDate;