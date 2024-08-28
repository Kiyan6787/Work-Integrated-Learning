import Image from "next/image";
import student from "../../public/images/user-type-icons/student.png";
import lecturer from "../../public/images/user-type-icons/lecturer.png";
import ngo from "../../public/images/user-type-icons/ngo.png";

export default async function Home() {
  const userTypes = [
    {
      id: 1,
      userType: "Student",
      img: student,
      link: "student/auth/login",
    },
    {
      id: 2,
      userType: "Lecturer",
      img: lecturer,
      link: "lecturer/auth/login",
    },
    {
      id: 3,
      userType: "NGO",
      img: ngo,
      link: "ngo/auth/login",
    },
  ];

  return (
    <div className="flex items-center justify-center flex-col min-h-screen">
      {/* <div>
        <h1 className="font-semibold mb-10 text-2xl text-gray-900 dark:text-white">
          Login
        </h1>
      </div> */}
      <div className="flex sm:flex-row items-center justify-center gap-5 flex-col">
        {userTypes.map((userType) => (
          <a
            href={userType.link}
            key={userType.id}
            className="w-full max-w-[220px] bg-white rounded-lg shadow-xl dark:bg-gray-800  hover:shadow-2xl dark:hover:shadow-xl transition duration-300 ease-in-out"
          >
            <div className="flex flex-col items-center  m-10">
              <Image
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={userType.img}
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {userType.userType}
              </h5>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
