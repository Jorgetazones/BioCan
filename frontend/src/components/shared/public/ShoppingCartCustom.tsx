import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../store/store';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const ShoppingCartCustom = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity!,
    0
  );

  const handleClick = () => {
    navigate('/cart');
  };

  return (
    <IconButton aria-label='cart' onClick={handleClick}>
      <StyledBadge badgeContent={totalItems} color='secondary'>
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
};

export default ShoppingCartCustom;
