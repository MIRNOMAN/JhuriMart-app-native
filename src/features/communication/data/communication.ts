export const contacts = [
  { id: 'jhone', name: 'Jhone Endrue', message: 'Hello how are you? I am going to market.', time: '23 min', unread: 2 },
  { id: 'jhune', name: 'Jhune Launde', message: 'We are on the runway at the military hangar.', time: '40 min', unread: 1 },
  { id: 'broman', name: 'Broman Alexander', message: 'Increased my new watch that I ordered from Amazon.', time: '1 hr', unread: 0 },
  { id: 'zack', name: 'Zack Jr', message: 'I just started in front of the school.', time: '1 hr', unread: 0 },
] as const;

export const notifications = [
  { icon: 'cart-outline', title: 'Purchase Completed', body: 'You have successfully purchased 334 headphones, thank you and wait for your package to arrive', time: '2 min ago' },
  { icon: 'person-outline', title: 'Jeremy Send You a Message', body: 'Hello your package has almost arrived, are you at home now?', time: '2 min ago' },
  { icon: 'settings-outline', title: 'Flash Sale!', body: 'Get 20% discount for first transaction in this month', time: '2 min ago' },
  { icon: 'cube-outline', title: 'Package Sent', body: 'Your package has been sent from New York', time: '10 min ago' },
] as const;
