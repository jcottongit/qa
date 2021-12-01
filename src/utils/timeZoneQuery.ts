import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const useTimeFromTimeZone = (timeZonePath: string) => (
  useSWR<{ datetime: string }>(`http://worldtimeapi.org/api/timezone${timeZonePath}`, fetcher)
);
