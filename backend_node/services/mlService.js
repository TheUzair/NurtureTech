import { Prophet } from 'facebook-prophet';
import { format } from 'date-fns'; // Use date-fns for date formatting
import connection from '../config/db.js'; // Assuming you're using this to fetch data from your database

const getEnrollmentData = async () => {
  // Query to fetch enrollment data from the database
  const query = 'SELECT date, COUNT(id) as count FROM enrollment GROUP BY date';
  const [data] = await connection.execute(query);
  
  // Transform data to format expected by Prophet
  const formattedData = data.map(row => ({
    ds: row.date,   // 'ds' for dates
    y: row.count,   // 'y' for counts
  }));
  
  return formattedData;
};

const predictEnrollments = async () => {
  // Fetch and preprocess data
  const historicalData = await getEnrollmentData();

  // Initialize and train the Prophet model
  const model = new Prophet();
  await model.fit(historicalData);

  // Make predictions for the next 6 months
  const future = await model.makeFutureDataFrame({ periods: 6, freq: 'M' });
  const forecast = await model.predict(future);

  return forecast.tail(6);  // Returning the next 6 months' predictions
};

export { predictEnrollments };
