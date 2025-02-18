document.getElementById('company-type-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const companyType = document.getElementById('companyType').value;
    const specialization = document.getElementById('specialization').value;
    const perYear = document.getElementById('perYear').value;
    const min = document.getElementById('min').value;
    const max = document.getElementById('max').value;
    const frameworks = document.getElementById('frameworks').checked;
    const software1 = document.getElementById('software1').value;
    const chance1 = document.getElementById('chance1').value;
    const software2 = document.getElementById('software2').value;
    const chance2 = document.getElementById('chance2').value;
    const software3 = document.getElementById('software3').value;
    const chance3 = document.getElementById('chance3').value;

    const textFileContent = `CompanyType
  {
      Specialization		"${specialization}"
      PerYear			${perYear}
      Min			${min}
      Max			${max}
      Frameworks		${frameworks}
      Types
      [
          {
          Software	"${software1}"
          Chance		${chance1}
          },
          {
          Software	"${software2}"
          Chance		${chance2}
          },
          {
          Software	"${software3}"
          Chance		${chance3}
          }
      ]
  }`;

    const blob = new Blob([textFileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `${companyType}.tyd`;
    downloadLink.click();
  });