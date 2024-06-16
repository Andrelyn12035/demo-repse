export default function Page({ params }: { params: { anio: string } }) {
  //tener un array de links que se actualice segun el directorio en el que se encuentre el usuario una variable de estado para el path del directorio y
  return (
    <>
      <div>
        <iframe
          title="SKF - Control SAF"
          width="800"
          height="486"
          src="https://app.powerbi.com/view?r=eyJrIjoiNDY4OWRkNDUtZDNlMC00NjFjLThkZmItMjJmYWViYmQyNmY1IiwidCI6ImNhODhmMmZkLTkxYzgtNDE3OS1hM2FhLWJjODM3NjVmNjUxMyJ9&pageName=76c5440e54369308734d"
          frameBorder="0"
          allowFullScreen={true}
        ></iframe>
      </div>
    </>
  );
}
