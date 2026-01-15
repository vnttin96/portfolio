import avatar from "../../public/avatar.png";
import Image from "next/image"

const HeroImage = () => {



  return (
    <>
      <Image
        src={avatar}
        alt="Tín Võ - IT Staff Professional"
        loading="eager"
        priority
        height={500}
        width={500}
        className="rounded-full"
      />
    </>
  )
}
export default HeroImage