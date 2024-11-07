'use effect'
import { redirectUrl } from "@/utils/content";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function ArtistName({data , actCallbackBackPlayer}: any) {

  const [getArtists, setArtists] = useState<any>([]);

  useEffect(() => {
    if (data.castncrew ) {
      setArtists([...data.castncrew.cast,  ...data.castncrew.crew])
    }
  }, [data]);

  function actCallRedirection () {
    if (typeof actCallbackBackPlayer == 'function') {
      actCallbackBackPlayer();
      actCallbackBackPlayer();

    }
  }

    return (
      <>
        {(getArtists.length > 0) ?
          [getArtists[0]].map((item: any, i: number) => {
            return <Link key={i} href={redirectUrl(item)} onClick={actCallRedirection} className="cursor-pointer hover:underline text-primaryItemColor text-xs" >{item.name}</Link>;
          })
        :
        data && data.bandorartist && Array.isArray(data.bandorartist) && data?.bandorartist.map((item: any, i: number) => {
            return <span key={i}>{item}</span>;
          })
        }
      </>
    );
  }