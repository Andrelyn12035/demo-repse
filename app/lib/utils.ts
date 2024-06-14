import mime from 'mime-types';
import { placeholderData} from './definitions';
import fs from 'fs';

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};


export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
export const pdfToIMG = async (buffer: Buffer): Promise<string> => {
  console.log(Buffer.byteLength(buffer));
  let respone = await fetch('http://localhost:8000/pdf2image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ file: buffer.toString('base64') }),
  });
  return respone.text();
};

export const classifyText = (text: string): number => {
  if (text.includes('FEDERALES')) {
    if (text.includes('ACUSE')) {
      return 2;
    } else if (text.includes('PAGO')) {
      return 4;
    }
    return 0;
  } else if (text.includes('CUOTAS') && text.includes('PAGO')) {
    return 1;
  } else if (text.includes('SIPARE')) {
    return 3;
  }
  return 0;
};

export const getCurrDate = (): string => {
  const currentDate = new Date();

  // Get the current date components
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  // Format the date as needed, for example, YYYY-MM-DD HH:MM:SS
  const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day
    .toString()
    .padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  return formattedDate;
};

export const getPlaceholder = () => {
  let placeholder: placeholderData[] = []
  const startYear = 2021;
  const months = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
  // Get the current date
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0-based index
  for (let year = startYear; year <= currentYear; year++) {
    for (let monthIndex = 0; monthIndex < months.length; monthIndex++) {
      // If the year is the current year and the month is after the current month, stop adding months
      if (year === currentYear && monthIndex > 5) { // 5 is June (0-based index)
        break;
      }
      if (year === currentYear && monthIndex > currentMonth) {
        break;
      }
      placeholder.push({ ejercicio: year.toString(), periodoPago: months[monthIndex] });
    }
  }
  return placeholder;
}
/*
async function refreshToken() {
  try {
      const response = await fetch('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
              redirect_uri: 'http://localhost/dashboard',
              client_id: '50ada1c0-a854-4782-aee3-d605d0253732',
              client_secret: onedrive_client_secret,
              refresh_token: onedrive_refresh_token,
              grant_type: 'refresh_token'
          })
      });

      if (!response.ok) {
          throw new Error(`Failed to refresh token: ${response.statusText}`);
      }

      const data = await response.json();
      const accessToken = data.access_token;

          const uploadResponse = await fetch(`https://graph.microsoft.com/v1.0/drive/root:/${onedrive_folder}/${onedrive_filename}:/content`, {
              method: 'PUT',
              headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': mime.lookup(file) || 'application/octet-stream'
              },
              body: fileContent
          });

          if (!uploadResponse.ok) {
              throw new Error(`Failed to upload file: ${uploadResponse.statusText}`);
          }

          const uploadResult = await uploadResponse.text();
          console.log(uploadResult);
}
*/