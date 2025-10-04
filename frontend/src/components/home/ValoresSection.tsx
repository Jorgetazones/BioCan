import { Box, Typography } from '@mui/material';

const ValoresSection = () => {
  const valores = [
    {
      title: 'Ecológico',
      image:
        '/src/data/img/sprout_leaf_plant_agriculture_ground_icon_183627.svg',
    },
    {
      title: 'Apoya lo local',
      image:
        '/src/data/img/agriculture_garden_farming_gardener_avatar_farm_man_nature_farmer_icon_262346.svg',
    },
    { title: 'Frescura garantizada', image: '/src/data/img/verduras.png' },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 4,
        px: 2,
        my: 6,
      }}
    >
      {valores.map((item) => (
        <Box
          key={item.title}
          sx={{
            width: { xs: '100%', sm: '30%' },
            textAlign: 'center',
          }}
        >
          <Box
            component='img'
            src={item.image}
            alt={item.title}
            sx={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '12px',
              boxShadow: 3,
              mb: 2,
            }}
          />
          <Typography variant='h6' fontWeight='bold'>
            {item.title}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ValoresSection;
