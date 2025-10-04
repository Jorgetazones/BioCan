import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';

const Faqs = () => {
  const faqs = [
    {
      question: '¿Qué tipo de productos ecológicos ofrecemos?',
      answer:
        'Ofrecemos una amplia variedad de productos ecológicos, incluyendo alimentos orgánicos, productos de limpieza sostenibles y artículos de cuidado personal respetuosos con el medio ambiente.',
    },
    {
      question: '¿Realizan envíos a todo el país?',
      answer:
        'Sí, realizamos envíos a todo el país. Los tiempos de entrega pueden variar dependiendo de tu ubicación.',
    },
    {
      question: '¿Cómo puedo saber si un producto es realmente ecológico?',
      answer:
        'Todos nuestros productos cuentan con certificaciones ecológicas reconocidas que garantizan su calidad y sostenibilidad.',
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer:
        'Aceptamos tarjetas de crédito, débito, transferencias bancarias y pagos a través de plataformas digitales como PayPal.',
    },
    {
      question: '¿Tienen políticas de devolución?',
      answer:
        'Sí, puedes devolver productos dentro de los 30 días posteriores a la compra, siempre que estén en su empaque original y sin usar.',
    },
  ];

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 4 }}>
      <Typography variant='h4' gutterBottom textAlign='center'>
        Preguntas Frecuentes
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography variant='h6'>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Faqs;
