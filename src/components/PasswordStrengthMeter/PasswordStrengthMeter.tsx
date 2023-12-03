import { useEffect, useState } from 'react';

interface PasswordStrengthMeterProps {
  password: string;
}

function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [color, setColor] = useState<string>('red');

  const calculateStrength = (password: string) => {
    const upperCaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const specialSymbolRegex = /[!@#$%^&*()_+-=[]{};':"\|,.<>?]/;
    const fullValidity = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{4,}$/i;

    const containsUpperCase = upperCaseRegex.test(password);

    const containsNumber = numberRegex.test(password);
    const containsSpecialSymbol = specialSymbolRegex.test(password);
    const fullyValid = fullValidity.test(password);

    if (fullyValid) {
      setPasswordStrength(100);
      setColor('green');
      return passwordStrength;
    }
    if (containsUpperCase && containsNumber && containsSpecialSymbol) {
      setPasswordStrength(66);
      setColor('yellow');
      return passwordStrength;
    }
    if (containsUpperCase || containsNumber || containsSpecialSymbol) {
      setPasswordStrength(33);
      setColor('orange');
      return passwordStrength;
    }
    setPasswordStrength(0);
    setColor('red');
    return passwordStrength;
  };

  useEffect(() => {
    if (password) {
      const strength = calculateStrength(password);
      setPasswordStrength(strength);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  return (
    <div>
      <progress
        value={passwordStrength}
        max={100}
        style={{ width: '100%', height: '20px', backgroundColor: color }}
      />
    </div>
  );
}

export default PasswordStrengthMeter;
