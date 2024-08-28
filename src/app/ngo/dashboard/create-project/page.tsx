import CreateProjectForm from "./CreateProjectForm";

export default function page() {
  return (
    <div className="grid grid-cols-1 gap-4 md:gap-6 2xl:gap-8">
      <CreateProjectForm />
    </div>
  );
}
