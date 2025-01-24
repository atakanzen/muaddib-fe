import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GithubIcon, GlobeIcon, LinkedinIcon } from "lucide-react";

type Developer = {
  name: string;
  image: string;
  links: { linkedin?: string; github?: string; website?: string };
};

const us: Developer[] = [
  {
    name: "Atakan",
    image: "/atakan.png",
    links: {
      github: "https://github.com/atakanzen",
      linkedin: "https://linkedin.com/in/atakanzen",
      website: "https://atakanzen.com",
    },
  },
  {
    name: "Vladimir",
    image: "/vladimir.png",
    links: {
      github: "https://github.com/limtis0",
      linkedin: "https://linkedin.com/in/limtis/",
    },
  },
  {
    name: "Mikhail",
    image: "/mikhail.png",
    links: {
      github: "https://github.com/Icoreeee",
      linkedin: "https://www.linkedin.com/in/m-kisliakov/",
    },
  },
];

const About = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-6">
      <h1 className="text-5xl font-bold">About Us</h1>
      <p className="text-xl">
        Of course, we're not all about just some web links. However, feel free
        to ping us from these platforms below to reach us!
      </p>
      <div className="flex items-center justify-center gap-2">
        {us.map((dev) => (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">{dev.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                className="rounded-full w-52 h-52"
                src={dev.image}
                alt={`avatar of ${dev.name}`}
              />
            </CardContent>
            <CardFooter>
              <div className="flex gap-2 items-center justify-center w-full">
                {dev.links.github && (
                  <a href={dev.links.github} target="_blank">
                    <GithubIcon />
                  </a>
                )}
                {dev.links.linkedin && (
                  <a href={dev.links.linkedin} target="_blank">
                    <LinkedinIcon />
                  </a>
                )}
                {dev.links.website && (
                  <a href={dev.links.website} target="_blank">
                    <GlobeIcon />
                  </a>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default About;
