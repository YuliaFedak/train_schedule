import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api')
    app.enableCors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    const PORT = process.env.PORT || 3000;
    await app.listen(PORT, '0.0.0.0');
    console.log(`Server running on port ${PORT}`);
}
bootstrap();
