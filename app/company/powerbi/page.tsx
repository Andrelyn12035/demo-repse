export default function Page({ params }: { params: { anio: string } }) {
  //tener un array de links que se actualice segun el directorio en el que se encuentre el usuario una variable de estado para el path del directorio y
  return (
    <>
      <div>
        <iframe title="Demo - PBI" className=" pt-5 w-[80vw] h-[97vh]" src="https://app.powerbi.com/view?r=eyJrIjoiOGQ5ZTg4ZjYtOTkxZi00Njc1LTk5OGUtN2UyZDQ3YWQ0NjMyIiwidCI6ImNhODhmMmZkLTkxYzgtNDE3OS1hM2FhLWJjODM3NjVmNjUxMyJ9&pageName=ReportSection8bf5b48ee359ca5e6502"  allowFullScreen={true}></iframe>
      </div>
    </>
  );
}
