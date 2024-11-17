interface Props {
  className: string;
  name: string;
}

// Button component
export default function Button({ className, name }: Props) {
  return <button className={className}>{name}</button>;
}
